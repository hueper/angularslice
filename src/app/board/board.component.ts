import {Component, Renderer, OnDestroy} from "@angular/core";
import * as _ from "lodash";
import {AreaComponent} from "./area";
import {ImageBarComponent} from "./image-bar";
import {Area, Folder, Image, NewArea} from "../shared/models";
import {AreaService, ImageService, RawImageService, FolderService, DialogService} from "../shared/services";
import {Subscription} from "rxjs";

@Component({
  selector: 'board',
  styles: [require('./board.component.scss')],
  template: require('./board.component.jade')(),
  directives: [
    AreaComponent,
    ImageBarComponent,
  ],
})
export class BoardComponent implements OnDestroy {
  currentImage:Image = null;
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
  private scrollTop:number;
  private scrollLeft:number;

  private listeners:any[] = [];
  private workspace:any;

  private subscriptions:Subscription[] = [];

  constructor(private areaService:AreaService,
              private rawImageService:RawImageService,
              private imageService:ImageService,
              private folderService:FolderService,
              private renderer:Renderer,
              private dialogService:DialogService) {

    // Subscribe for areas
    this.subscriptions.push(this.areaService.dataSource.subscribe((areas:Area[]) => {
      this.areas = areas;
      console.log('areas =>', areas);
    }));

    // Subscribe for folders
    this.subscriptions.push(this.folderService.dataSource.subscribe((folders:Folder[]) => {
      this.folders = folders;
      console.log('folders =>', folders);
    }));

    // Look for new images without filtering
    this.subscriptions.push(this.imageService.dataSource.subscribe((data:Image[]) => {
      this.images = data;
    }));

    this.subscriptions.push(this.imageService.currentImage.subscribe((data:Image) => {
      this.currentImage = data;

      this.imageContainerStyle['width'] = this.currentImage.width + 'px';
      this.imageContainerStyle['height'] = this.currentImage.height + 'px';
      this.imageContainerStyle['background-image'] = 'url(' + this.imageService.getBinaryData(this.currentImage) + ')';
    }));

    setTimeout(() => {
      this.workspace = document.querySelector('.workingSpace');
    })
  }

  loadFile(event) {
    var file = event.srcElement.files[0];
    this.rawImageService.createFromFile(file);
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

    this.offsetTop = imageContainer.offsetTop;
    this.offsetLeft = imageContainer.offsetLeft;
    this.scrollTop = workingSpace.scrollTop;
    this.scrollLeft = workingSpace.scrollLeft;

    this.newArea = new NewArea(event.clientX - this.offsetLeft + this.scrollLeft, event.clientY - this.offsetTop + this.scrollTop);
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
      let plusTop:number = this.workspace.scrollTop;
      let plusLeft:number = this.workspace.scrollLeft;

      this.newArea.setDiagonalCoordinates(
        Math.max(0, Math.min(this.currentImage.width, event.clientX - this.offsetLeft + plusLeft)),
        Math.max(0, Math.min(this.currentImage.height, event.clientY - this.offsetTop + plusTop))
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
    if (!_.isEmpty(this.newArea) && !this.isCrossingOther(this.newArea)) {
      this.dialogService.openCreateComponentDialog()
        .then((data) => {
          this.createComponentDialogCallback(this.newArea, data);
          this.newArea = null;
          this.areaStyle = {};
        })
        .catch(error => {
          console.log("error => ", error);
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
      this.folderService.create(new Folder(null, data.newFolderName));
      folderId = _.last(this.folders).id;
    } else {
      folderId = data.folder;
    }

    console.log(area);
    area.setFolderId(folderId);

    if (data.attach) {
      this.imageService.create(new Image(folderId, this.currentImage.rawImageId, data.newImageName, area.x, area.y, area.width, area.height));
      let image = _.last(this.images);
      area.setImageId(image.id);
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
