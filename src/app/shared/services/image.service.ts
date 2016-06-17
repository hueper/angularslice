import {Injectable} from "@angular/core";
import {Image, RawImage, Folder} from "../models";
import {BaseService} from "./base.service";
import {RawImageService} from "./raw-image.service";
import {FolderService} from "./folder.service";
import {ReplaySubject} from "rxjs";


@Injectable()
export class ImageService extends BaseService<Image> {
  currentImage: ReplaySubject<Image> = new ReplaySubject<Image>();
  currentFolder: Folder;

  constructor(private folderService:FolderService,
              private rawImageService: RawImageService)
  {
    super();

    this.folderService.currentSource.subscribe(folder => {
      this.currentFolder = folder;
    });

    // Automatically create an image on rawImage creation
    rawImageService.createSource.subscribe((rawImage: RawImage) => {
      let image = new Image(this.currentFolder ? this.currentFolder.id : null, rawImage.id, 'default', 0, 0, rawImage.width, rawImage.height);
      this.create(image);
    });

    rawImageService.createSource.subscribe(() => {})

    folderService.deleteSource.subscribe(folder => {
      this.find({ folderId: folder.id }).map( (image) => {
        this.delete(image);
      });
    });
  }

  getBinaryData (instance: Image) {
    const rawImage = this.rawImageService.findById(instance.rawImageId);
    return rawImage ? rawImage.binaryData : null;
  }
  getRawImage (instance: Image) {
    const rawImage = this.rawImageService.findById(instance.rawImageId);
    return rawImage ? rawImage : null;
  }

  setCurrentImage(instance: Image) {
    this.currentImage.next(instance);
  }

  delete(instance: Image) {
    if(this.find({ rawImageId: instance.rawImageId}).length <= 1) {
      this.rawImageService.delete(this.rawImageService.findById(instance.rawImageId));
    }

    super.delete(instance);
  }
}
