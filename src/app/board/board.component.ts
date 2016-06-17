import {Component, Renderer, OnDestroy} from "@angular/core";
import * as _ from "lodash";
import {AreaComponent} from "./area";
import {ImageBarComponent} from "./image-bar";
import {Area, Folder, Image, NewArea} from "../shared/models";
import {AreaService, ImageService, RawImageService, FolderService, DialogService} from "../shared/services";
import {Subscription} from "rxjs";
import {SlicedImage} from "../sliced-image";

@Component({
  selector: 'board',
  styles: [require('./board.component.scss')],
  template: require('./board.component.jade')(),
  directives: [
    AreaComponent,
    ImageBarComponent,
    SlicedImage
  ],
})
export class BoardComponent implements OnDestroy {
  currentImage:Image;
  areaStyle:any = {};
  imageContainerStyle:any = {
    'width': '0',
    'height': '0',
    'background-image': 'url()',
    'background-size': 'contain',
    'position': 'relative'
  };

  private newArea:NewArea = null;
  private areas:Area[] = [];
  private folders:Folder[] = [];
  private images:Image[] = [];

  private offsetTop:number;
  private offsetLeft:number;
  private offsetTopContainer:number;
  private offsetLeftContainer:number;
  private maxWidth:number;
  private maxHeight:number;
  private scaleWidth:number;
  private scaleHeight:number;

  private listeners:any[] = [];

  private subscriptions:Subscription[] = [];
  private hover:boolean = false;

  private areaSubscription:Subscription;

  private currentFolderId:number;
  public currentFolder:Folder;
  private currentArea:Area;
  private currentAreaFolder:Folder;
  private areaEdit:boolean;
  private componentEdit:boolean;

  constructor(private areaService:AreaService,
              private rawImageService:RawImageService,
              private imageService:ImageService,
              private folderService:FolderService,
              private renderer:Renderer,
              private dialogService:DialogService) {

    // Subscribe for folders
    this.subscriptions.push(this.folderService.dataSource.subscribe((folders:Folder[]) => {
      this.folders = folders;
    }));

    this.subscriptions.push(this.folderService.currentSource.subscribe((currentSource) => {
      if (currentSource) {
        this.currentFolderId = currentSource.id;
        this.currentFolder = currentSource;
      }
    }));

    // Look for new images without filtering
    this.subscriptions.push(this.imageService.dataSource.subscribe((data:Image[]) => {
      this.images = data;
    }));

    this.subscriptions.push(this.imageService.currentImage.subscribe((data:Image) => {
      this.currentImage = data;
      if(this.areaSubscription) {
        this.areaSubscription.unsubscribe();
      }
      // Subscribe for areas
      this.areaSubscription = this.areaService.filter(instance => instance.imageId === this.currentImage.id).subscribe((areas:Area[]) => {
        this.areas = areas;
      });
      this.subscriptions.push(this.areaSubscription);
    }));

    this.subscriptions.push(this.areaService.currentSource.subscribe((data: Area) => {
      this.currentArea = data;
      if(data) {
        this.currentAreaFolder = this.folderService.findById(data.folderId);
      }
    }));
  }

  onDragOver(event) {
    event.preventDefault();
    this.hover = true;
    return false;
  }

  onDrop(event) {
    event.preventDefault();
    var file = event.dataTransfer.files[0];
    this.hover =false;
    this.rawImageService.createFromFile(file);
    return false;
  }

  loadFile(event) {
    var file = event.srcElement.files[0];
    this.rawImageService.createFromFile(file);
  }

  onDragEnter(event) {
    this.hover = true;
    return false;
  }

  onDragExit(event) {
    this.hover = false;
    return false;
  }

  setActiveArea(area) {
    this.areaService.setCurrentById(area.id);
  }
  setComponentEdit(type) {
    if(type == 'area') {
      this.areaEdit = true;
    }
    if(type == 'component') {
      this.componentEdit = true;
    }
  }
  saveComponentEdit(type) {
    if(type == 'area') {
      this.folderService.update(this.currentAreaFolder);
      this.areaEdit = false;
    }
    if(type == 'component') {
      this.folderService.update(this.currentFolder);
      this.componentEdit = false;
    }
  }

  ngOnDestroy() {
    _.each(this.listeners, unsubscribeFromListener => {
      unsubscribeFromListener(); // unsubscribe
    });

    _.each(this.subscriptions, subscription => {
      subscription.unsubscribe();
    });
  }

  /**
   *
   * On mouse down, we start to listen for mousemove, and mouseup events globally
   *
   * @param event
   * @param {nativeElement} imageContainer
   * @returns {boolean}
   */
  onMouseDown(event, imageContainer, workingSpace) {

    if (event.target != imageContainer.myCanvas.nativeElement) {
      return false;
    }

    this.offsetTop = imageContainer.myCanvas.nativeElement.offsetTop;
    this.offsetLeft = imageContainer.myCanvas.nativeElement.offsetLeft;
    this.offsetTopContainer = workingSpace.offsetTop;
    this.offsetLeftContainer = workingSpace.offsetLeft;

    this.maxHeight = imageContainer.myCanvas.nativeElement.height;
    this.maxWidth = imageContainer.myCanvas.nativeElement.width;

    this.newArea = new NewArea(event.layerX + this.offsetLeft,
      event.layerY + this.offsetTop,
      imageContainer.scaleWidth, imageContainer.scaleHeight,
      this.offsetTop, this.offsetLeft
    );


    this.areaStyle['pointer-events'] = 'none';

    this.listeners.push(this.renderer.listenGlobal('document', 'mousemove', this.onMouseMove.bind(this)));
    this.listeners.push(this.renderer.listenGlobal('document', 'mouseup', this.onMouseUp.bind(this)));

    return false;
  }

  /**
   *
   * On mouse move, we update the area object's coordinates (width and height)
   *
   * @param event
   * @returns {boolean}
   */
  onMouseMove(event) {
    if (this.newArea) {
      this.newArea.setDiagonalCoordinates(
        Math.max(0 + this.offsetLeft, Math.min(this.maxWidth + this.offsetLeft, event.clientX - this.offsetLeftContainer)),
        Math.max(0 + this.offsetTop, Math.min(this.maxHeight + this.offsetTop, event.clientY - this.offsetTopContainer))
      );
      this.newArea.invalid = this.isCrossingOther(this.newArea);
    }

    return false;
  }

  /**
   *
   * On mouseUp we unsubscribe from mouseMove and mouseUp events, and show a dialog for the user
   *
   * @param event
   * @returns {boolean}
   */
  onMouseUp(event) {
    if (!_.isEmpty(this.newArea) && !this.isCrossingOther(this.newArea) && this.newArea.width > 7 && this.newArea.height > 7 ) {
      this.dialogService.openCreateComponentDialog()
        .then((data) => {
          this.createComponentDialogCallback(this.newArea, data);
          this.newArea = null;
          this.areaStyle = {};
        })
        .catch(error => {
          this.newArea = null;
          this.areaStyle = {};
        });
    } else {
      this.newArea = null;
      this.areaStyle = {};
    }

    // On mouse released, we should stop listening for these events
    _.each(this.listeners, unsubscribeFromListener => {
      unsubscribeFromListener(); // unsubscribe
    });
    this.listeners = [];


    return false;
  }

  createComponentDialogCallback(area, data) {
    if (data && data.action == 'save') {
      this.createComponent(area, data.data)
    }
  }

  createComponent(area, data) {

    //TODO: Would be nice if the create method could give back the the created object with the created id!
    let type = data.type;
    let folderId;

    if (type == 'new') {
      this.folderService.create(new Folder(this.currentFolderId, data.newFolderName));
      folderId = _.last(this.folders).id;
    } else {
      folderId = data.folder;
    }

    area.setFolderId(folderId);

    if (data.attach) {
      this.imageService.create(new Image(folderId, this.currentImage.rawImageId, data.newImageName, area.x / area.scaleWidth - area.offsetLeft / area.scaleWidth + this.currentImage.x, area.y/ area.scaleHeight - area.offsetTop / area.scaleHeight + this.currentImage.y, area.width / area.scaleWidth, area.height / area.scaleHeight));
      let image = _.last(this.images);
      area.setImageId(this.currentImage.id);
    }
    this.areaService.create(area);

  }

  private isCrossingOther(area:Area):boolean {
    return !!(<any>this.areas).find((cmp) => cmp.overLaps(area));
  }

  private findComponent(x, y):Folder {
    const component = (<any>this.areas).find((cmp) => cmp.contains(x, y));
    return component;
  }

}
