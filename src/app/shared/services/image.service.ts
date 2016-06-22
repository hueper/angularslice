import { Injectable } from "@angular/core";
import { Image, RawImage, Folder } from "../models";
import { BaseService } from "./base.service";
import { RawImageService } from "./raw-image.service";
import { FolderService } from "./folder.service";

@Injectable()
export class ImageService extends BaseService<Image> {
  currentFolder: Folder;

  constructor(
    private folderService:FolderService,
    private rawImageService: RawImageService
  ) {
    super('images', Image);

    this.folderService.currentSource.subscribe(folder => {
      this.currentFolder = folder;
    });

    // Automatically create an image on rawImage creation
    rawImageService.createSource.subscribe((rawImage: RawImage) => {
      const folderId = this.currentFolder ? this.currentFolder._id : null;
      const fileName = rawImage.name ? rawImage.name : 'image' + Math.floor(Math.random() * 10000);

      let image = new Image(folderId, rawImage._id, fileName, 0, 0, rawImage.width, rawImage.height);
      this.create(image);
    });

    rawImageService.createSource.subscribe(() => {})

    folderService.deleteSource.subscribe(folder => {
      this.find({ folderId: folder._id }).map( (image) => {
        this.delete(image);
      });
    });
  }

  getBinaryData (instance: Image) {
    const rawImage = this.rawImageService.findById(instance.rawImageId);
    return rawImage ? rawImage.url : null;
  }
  getRawImage (instance: Image) {
    const rawImage = this.rawImageService.findById(instance.rawImageId);
    return rawImage ? rawImage : null;
  }

  setCurrentImage(instance: Image) {
    this.currentIdSource.next(instance._id);
  }

  delete(instance: Image) {
    if(this.find({ rawImageId: instance.rawImageId}).length <= 1) {
      this.rawImageService.delete(this.rawImageService.findById(instance.rawImageId));
    }

    super.delete(instance);
  }
}
