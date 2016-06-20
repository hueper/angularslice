import { Component, OnDestroy, ElementRef } from "@angular/core";
import { MD_ICON_DIRECTIVES } from "@angular2-material/icon";
import * as _ from "lodash";
import { Subscription } from "rxjs/Rx";

import { ImageService, FolderService, DialogService, RawImageService } from "../../shared/services";
import { Image, Folder } from "../../shared/models";
import { SlicedImageComponent } from "../../sliced-image";

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

  constructor(
    private imageService:ImageService,
    private rawImageService:RawImageService,
    private folderService:FolderService,
    private el: ElementRef,
    private dialogService: DialogService
  ) {

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


    this.subscriptions.push(this.imageService.currentSource.subscribe(image => {
      this.currentImage = image;
    }));

    this.subscriptions.push(this.rawImageService.currentSource.subscribe(() => {
      setTimeout(() => {
        this.jumpToTheLast();
      })
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
    // Confirm Dialog
    this.dialogService.openConfirmDialog().then((result) => {
      if (result) {
        this.imageService.delete(image);
      }
    });
  }

  jumpToTheLast() {
    this.el.nativeElement.scrollLeft = this.el.nativeElement.scrollWidth;
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
