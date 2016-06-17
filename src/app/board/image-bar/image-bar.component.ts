import * as _ from "lodash";
import { Component, OnDestroy } from "@angular/core";
import { ImageService, RawImageService } from "../../shared/services";
import { Image } from "../../shared/models";
import { SlicedImageComponent } from "../../sliced-image";
import { Subscription } from "rxjs/Rx";
import { FolderService } from "../../shared/services/folder.service";
import { Folder } from "../../shared/models/folder.model";
import { MD_ICON_DIRECTIVES } from "@angular2-material/icon";

@Component({
  selector: 'image-bar',
  template: require('./image-bar.component.jade')(),
  styles: [require('./image-bar.component.scss')],
  directives: [SlicedImageComponent, MD_ICON_DIRECTIVES]
})
export class ImageBarComponent implements OnDestroy {

  private images:Image[];
  private imagesSubscribe:Subscription;

  private currentImage:Image;
  private currentFolder:Folder;

  private subscriptions:Subscription[] = [];
  private hover:boolean = false;
  private editImage:boolean = false;

  constructor(private imageService:ImageService,
              private rawImageService:RawImageService,
              private folderService:FolderService) {

    this.subscriptions.push(this.folderService.currentSource.subscribe(currentSource => {
      this.currentFolder = currentSource;
      if(this.imagesSubscribe) {
        this.imagesSubscribe.unsubscribe();
      }

      this.imagesSubscribe = this.imageService
        .filter(f => this.currentFolder && f.folderId === this.currentFolder.id)
        .subscribe((images:Image[]) => {
          this.images = images;
          if (this.currentImage && this.images.length > 0 && _.filter(this.images, f => f.id === this.currentImage.id).length < 1) {
            // The current image is not in current scope/folder
            this.imageService.setCurrentImage(this.images[0]);
          }
        });
    }));


    this.subscriptions.push(this.imageService.currentImage.subscribe(image => {
      this.currentImage = image;
    }));

  }
  setEditName(inputField) {
    this.editImage = true;
    setTimeout(() => {
      inputField.focus();
    });
  }
  saveImage(image) {
    this.imageService.update(image);
    this.editImage = false;
  }

  deleteImage(image) {
    this.imageService.delete(image);
  }

  onDragOver(event) {
    event.preventDefault();
    this.hover = true;
    return false;
  }

  onDrop(event) {
    event.preventDefault();
    var file = event.dataTransfer.files[0];
    this.rawImageService.createFromFile(file);
    return false;
  }

  loadFile(event) {
    console.log(event);
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

  getImage(image) {
    return this.imageService.getBinaryData(image);
  }

  setBoardImage(image) {
    this.imageService.setCurrentImage(image)
  }

  ngOnDestroy() {
    _.each(this.subscriptions, subscription => {
      subscription.unsubscribe();
    });
  }

}
