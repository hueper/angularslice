import { Component, Renderer, OnDestroy } from "@angular/core";
import { Http, Headers } from "@angular/http";
import * as _ from "lodash";
import { Subscription } from "rxjs";
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
const Humane = require('humane-js');

import { AreaService, ImageService, RawImageService, FolderService, DialogService } from "../shared/services";
import { ImageBarComponent } from "./image-bar";
import { Area, Folder, Image, NewArea } from "../shared/models";
import { AreaComponent } from "./area";
import { SlicedImageComponent } from "../sliced-image";
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from "@angular2-material/progress-circle/progress-circle";
import { TooltipDirective } from "../shared/directives/tooltip/tooltip.directive";


@Component({
  selector: 'board',
  styles: [require('./board.component.scss')],
  template: require('./board.component.jade')(),
  directives: [
    AreaComponent,
    ImageBarComponent,
    SlicedImageComponent,
    MD_PROGRESS_CIRCLE_DIRECTIVES,
    TooltipDirective
  ],
})
export class BoardComponent implements OnDestroy {
  currentImage: Image;
  areaStyle: any = {};

  private loading: boolean = false;

  private newArea: NewArea = null;
  private areas: Area[] = [];
  private folders: Folder[] = [];
  private images: Image[] = [];

  private offsetTop: number;
  private offsetLeft: number;
  private offsetTopContainer: number;
  private offsetLeftContainer: number;
  private maxWidth: number;
  private maxHeight: number;
  private scaleWidth: number;
  private scaleHeight: number;

  private listeners: any[] = [];

  private subscriptions: Subscription[] = [];
  private hover: boolean = false;

  private areaSubscription: Subscription;
  private currentImageSubscription: Subscription;
  private imagesSubscription: Subscription;

  private currentFolderId: string;
  public currentFolder: Folder;
  private currentArea: Area;
  private currentAreaFolder: Folder;
  private areaEdit: boolean;
  private componentEdit: boolean;

  constructor(private http: Http,
              private ga: Angulartics2GoogleAnalytics,
              private areaService: AreaService,
              private rawImageService: RawImageService,
              private imageService: ImageService,
              private folderService: FolderService,
              private renderer: Renderer,
              private dialogService: DialogService) {

    // Subscribe for folders
    this.subscriptions.push(this.folderService.dataSource.subscribe((folders: Folder[]) => {
      this.folders = folders;
    }));

    this.subscriptions.push(this.folderService.currentSource.subscribe((currentSource) => {
      if (currentSource) {
        this.currentFolderId = currentSource._id;
        this.currentFolder = currentSource;

        if (this.currentImageSubscription) {
          this.currentImageSubscription.unsubscribe();
        }
        if (this.imagesSubscription) {
          this.imagesSubscription.unsubscribe();
        }
        this.currentImageSubscription = this.subscribeImageSource();
        this.imagesSubscription = this.subscribeImagesSource();
      }
    }));

    // Look for new images without filtering
    this.subscriptions.push(this.areaService.currentSource.subscribe((data: Area) => {
      this.currentArea = data;
      if (data) {
        this.currentAreaFolder = this.folderService.findById(data.folderId);
      }
    }));
  }

  subscribeImagesSource(): Subscription {
    return this.imageService.filter(image => image.folderId === this.currentFolderId).subscribe((data: Image[]) => {
      this.images = data;
    });
  }

  subscribeImageSource(): Subscription {
    return this.imageService.currentSource.subscribe((data: Image) => {
      this.currentImage = data;
      if (this.areaSubscription) {
        this.areaSubscription.unsubscribe();
      }
      // Subscribe for areas
      this.areaSubscription = this.areaService.filter(
        instance => instance.imageId === this.currentImage._id).subscribe(
        (areas: Area[]) => {
          this.areas = areas;
        });
    })
  }

  onDragOver(event) {
    event.preventDefault();
    this.hover = true;
    return false;
  }

  onDrop(event) {
    event.preventDefault();
    this.loading = true;
    var file = event.dataTransfer.files[0];
    this.hover = false;
    this.rawImageService.createFromFile(file).then(result => {
      this.loading = false;
    });
    return false;
  }

  loadFile(event) {
    // TODO, move to config:
    this.loading = true;
    const supportedFileExtension = ['jpg', 'png', 'jpeg'];
    const file = event.target.files[0];
    const extension = file.name.split('.').pop();

    // TODO, add analytics
    if (supportedFileExtension.indexOf(extension) === -1) {
      Humane.log(`Sorry we support just 'png' and 'jpg' files at the moment.`, { timeout: 4000, clickToClose: true });
      this.ga.eventTrack('uplaod', { category: extension });
    } else {
      this.rawImageService.createFromFile(file).then(result => {
        this.loading = false;
      });
      ;
    }
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
    this.areaService.setCurrentById(area._id);
  }

  setComponentEdit(type) {
    if (type == 'area') {
      this.areaEdit = true;
    }
    if (type == 'component') {
      this.componentEdit = true;
    }
  }

  saveComponentEdit(type) {
    if (type == 'area') {
      this.folderService.update(this.currentAreaFolder);
      this.areaEdit = false;
    }
    if (type == 'component') {
      this.folderService.update(this.currentFolder);
      this.componentEdit = false;
    }
  }

  ngOnDestroy() {
    _.each(this.listeners, unsubscribeFromListener => {
      unsubscribeFromListener(); // unsubscribe
    });

    _.each(this.subscriptions, subscription => {
      if (!subscription.isUnsubscribed) {
        subscription.unsubscribe();
      }
    });

    if (!this.currentImageSubscription.isUnsubscribed) {
      this.currentImageSubscription.unsubscribe();
    }
    if (!this.areaSubscription.isUnsubscribed) {
      this.areaSubscription.unsubscribe();
    }
  }

  /**
   *
   * On mouse down, we start to listen for mousemove, and mouseup events globally
   *
   * @param event
   * @param {nativeElement} imageContainer
   * @returns {boolean}
   */
  onMouseDown(event, imageContainer) {

    if (event.target != imageContainer.myCanvas.nativeElement) {
      return false;
    }

    // Global position
    this.offsetTopContainer = imageContainer.myCanvas.nativeElement.offsetParent.offsetTop;
    this.offsetLeftContainer = imageContainer.myCanvas.nativeElement.offsetParent.offsetLeft;

    this.maxHeight = imageContainer.myCanvas.nativeElement.height;
    this.maxWidth = imageContainer.myCanvas.nativeElement.width;

    this.newArea = new NewArea(
      event.layerX,
      event.layerY,
      imageContainer.scaleWidth,
      imageContainer.scaleHeight
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
      const xMax = Math.min(this.maxWidth, event.clientX - this.offsetLeftContainer);
      const yMax = Math.min(this.maxHeight, event.clientY - this.offsetTopContainer);

      this.newArea.setDiagonalCoordinates(
        Math.max(0, xMax),
        Math.max(0, yMax)
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
    if (!_.isEmpty(this.newArea) && !this.isCrossingOther(
        this.newArea) && this.newArea.width > 7 && this.newArea.height > 7) {
      this.dialogService.openCreateComponentDialog(true)
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
      folderId = _.last(this.folders)._id;
    } else {
      folderId = data.folder;
    }

    area.setFolderId(folderId);

    if (data.attach) {
      const newImage = new Image(
        folderId.toString(),
        this.currentImage.rawImageId,
        data.newImageName,
        area.x / area.scaleWidth + this.currentImage.x,
        area.y / area.scaleHeight + this.currentImage.y,
        area.width / area.scaleWidth,
        area.height / area.scaleHeight
      );

      this.imageService.create(newImage);

      let image = _.last(this.images);
      area.setImageId(this.currentImage._id);
    }
    area.x = area.x / area.scaleWidth;
    area.y = area.y / area.scaleHeight;
    area.width = area.width / area.scaleWidth;
    area.height = area.height / area.scaleHeight;

    this.areaService.create(area);

  }

  private isCrossingOther(area: Area): boolean {
    return !!(<any>this.areas).find((cmp) => cmp.overLaps(area));
  }

  private findComponent(x, y): Folder {
    const component = (<any>this.areas).find((cmp) => cmp.contains(x, y));
    return component;
  }

}
