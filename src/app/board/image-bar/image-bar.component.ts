import { Component, OnDestroy, ElementRef } from "@angular/core";
import * as _ from "lodash";
import { Subscription } from "rxjs/Rx";

import { ImageService, FolderService, DialogService, RawImageService } from "../../shared/services";
import { Image, Folder } from "../../shared/models";
import { AnalyticsService } from "../../shared/services/analytics.service";

@Component({
  selector: 'image-bar',
  template: require('./image-bar.component.pug')(),
  styles: [require('./image-bar.component.scss')],
})
export class ImageBarComponent implements OnDestroy {

  private images: Image[];
  private imagesSubscribe: Subscription;
  private loading: boolean = false;

  private currentImage: Image;
  private currentFolder: Folder;

  private subscriptions: Subscription[] = [];
  private hover: boolean = false;
  private editImage: any = {};
  private image: any = {};

  constructor(private imageService: ImageService,
              private ga: AnalyticsService,
              private rawImageService: RawImageService,
              private folderService: FolderService,
              private el: ElementRef,
              private dialogService: DialogService) {

    this.subscriptions.push(this.folderService.currentSource.subscribe(currentSource => {
      this.currentFolder = currentSource;
      if (this.imagesSubscribe) {
        this.imagesSubscribe.unsubscribe();
      }

      this.imagesSubscribe =
        this.imageService
            .filter(f => this.currentFolder && f.folderId === this.currentFolder._id)
            .subscribe((images: Image[]) => {
                this.images = images;
                if (this.currentImage && this.images.length > 0 && _.filter(this.images,
                    f => f._id === this.currentImage._id).length < 1) {
                  // The current image is not in current scope/folder
                  this.imageService.setCurrentImage(this.images[0]);
                }
              }
            );
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

  setEditName(id, inputField) {
    this.editImage[id] = true;
    console.log("inputField => ", inputField);
    console.log("id => ", id);
    setTimeout(() => {
      inputField.focus();
    });
  }

  saveImage(image) {
    this.ga.eventTrack('renameImage', { category: 'manually' });
    this.imageService.update(image);
    this.editImage[image._id] = false;
  }

  imageKeyDown(event) {
    if (event.which === 13) {
      event.preventDefault();
      event.target.blur();
      return false;
    }
  }

  deleteImage(image) {
    this.ga.eventTrack('deleteImage', { category: 'manually' });
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
    let file = event.dataTransfer.files[0];
    this.loadFile(event, file);
    return false;
  }

  loadFile(event, file = null) {
    this.loading = true;
    file = file ? file : event.target.files[0];
    this.rawImageService.createFromFile(file).then(
      result => {
        this.loading = false
      },
      errResult => {
        this.loading = false
      }
    );
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
