import {Component, Renderer, OnInit, OnDestroy } from "@angular/core";
import * as _ from "lodash";
import { AreaComponent } from "./area";
import { ImageBarComponent } from "./image-bar";
import { Area, Folder, Image, NewArea } from "../shared/models";
import { AreaService, ImageService, RawImageService, FolderService } from "../shared/services";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ComponentDialog, ComponentDialogData } from '../component_dialog/component';

@Component({
  selector: 'board',
  styles: [ require('./board.component.scss') ],
  template: require('./board.component.jade')(),
  directives: [
    AreaComponent,
    ImageBarComponent,
  ]
})
export class BoardComponent implements OnInit, OnDestroy {
  currentImage: Image = null;
  areaStyle: any = {};
  imageContainerStyle:any = {
    'width': '0',
    'height': '0',
    'background-image': 'url()',
    'background-size': 'contain',
    'position': 'relative'
  };

  private newArea: NewArea = null;
  private areas: Area[] = [];
  private folders: Folder[] = [];
  private images: Image[] = [];

  private offsetTop:number;
  private offsetLeft:number;

  private listeners:any[] = [];
  private workspace:any;

  constructor(private areaService:AreaService,
              private rawImageService:RawImageService,
              private imageService:ImageService,
              private folderService:FolderService,
              private renderer:Renderer,
              private modal:Modal) {

    // Subscribe for areas
    this.areaService.dataSource.subscribe((areas: Area[]) => {
      this.areas = areas;
      console.log('areas =>', areas);
    });

    // Subscribe for folders
    this.folderService.dataSource.subscribe((folders: Folder[]) => {
      this.folders = folders;
      console.log('folders =>', folders);

    });

    // Look for new images without filtering
    this.imageService.dataSource.subscribe((data: Image[]) => {
      this.images = data;
      if (!data.length) return;
      this.currentImage = data[0];

      // this.imageContainerStyle['display'] = 'initial';
      this.imageContainerStyle['width'] = this.currentImage.width + 'px';
      this.imageContainerStyle['height'] = this.currentImage.height + 'px';
      this.imageContainerStyle['background-image'] = 'url(' + this.imageService.getBinaryData(this.currentImage) + ')';
    });
    setTimeout(() => {
      this.workspace = document.querySelector('.workingSpace');
    })

  }

  loadFile(event) {
    var file  = event.srcElement.files[0];
    this.rawImageService.createFromFile(file);
  }

  ngOnInit() {
    this.listeners.push(this.renderer.listenGlobal('document', 'mousemove', this.onMouseMove.bind(this)));
    this.listeners.push(this.renderer.listenGlobal('document', 'mouseup', this.onMouseUp.bind(this)));
  }

  ngOnDestroy() {
    _.each(this.listeners, unsubscribeFromListener => {
      unsubscribeFromListener(); // unsubscribe
    });
  }

  onMouseDown(event) {
    console.log("event => ", event);

    this.offsetTop = event.target.offsetTop;
    this.offsetLeft = event.target.offsetLeft;

    this.newArea = new NewArea(event.offsetX, event.offsetY);
    this.areaStyle['pointer-events'] = 'none';

    return false;
  }

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

  onMouseUp(area) {

    if (!_.isEmpty(this.newArea) && !this.isCrossingOther(this.newArea)) {
      this.openCreateComponentDialog(this.newArea);
    }

    this.newArea = null;
    this.areaStyle = {};

    return false;
  }

  openCreateComponentDialog(area) {
    const data = new ComponentDialogData();
    this.modal
      .open(ComponentDialog, data)
      .then(dialog => {
        dialog.result.then(data => {
          if(data && data.action == 'save') {
            if(data.data.type == 'new') {
              this.createComponent(area, data.data)
            }
          }
        })
      });
  }

  createComponent(area, data) {

    //TODO: Would be nice if the create method could give back the the created object with the created id!
    this.folderService.create(new Folder(null, data.newFolderName));
    let folder = _.last(this.folders);

    area.setFolderId(folder.id);

    if(data.attach) {
      this.imageService.create(new Image(folder.id, this.currentImage.rawImageId, data.newImageName, area.x, area.y, area.width, area.height));
      let image = _.last(this.images);
      area.setImageId(image.id);
    }
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
