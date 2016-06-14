import * as _ from "lodash";
import {Component, OnDestroy} from "@angular/core";
import {ImageService, RawImageService} from "../../shared/services";
import {Image} from "../../shared/models";
import {SlicedImage} from "../../sliced-image";
import {Subscription, Observable} from "rxjs/Rx";
import {FolderService} from "../../shared/services/folder.service";
import {Folder} from "../../shared/models/folder.model";

@Component({
  selector: 'image-bar',
  template: require('./image-bar.component.jade')(),
  styles: [require('./image-bar.component.scss')],
  directives: [SlicedImage]
})
export class ImageBarComponent implements OnDestroy {

  private images:Observable<Image[]>;
  private currentImage:Image;

  private currentFolder:Folder;

  private subscriptions:Subscription[] = [];
  private hover:boolean = false;

  constructor(private imageService:ImageService,
              private rawImageService:RawImageService,
              private folderService:FolderService) {

    this.subscriptions.push(this.folderService.currentSource.subscribe(currentSource => {
      this.currentFolder = currentSource;

      this.images = this.imageService.filter(f => f.folderId === this.currentFolder.id || f.folderId === this.currentFolder.folderId);

    }));
    this.subscriptions.push(this.imageService.currentImage.subscribe(image => {
      this.currentImage = image;
    }));

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
