import {Injectable} from "@angular/core";
import {Image, RawImage} from "../models";
import {BaseService} from "./base.service";
import {RawImageService} from "./raw-image.service";
import {ReplaySubject} from "rxjs";


@Injectable()
export class ImageService extends BaseService<Image> {
  currentImage: ReplaySubject<Image> = new ReplaySubject<Image>();

  constructor(
    private rawImageService: RawImageService)
  {
    super();

    // Automatically create an image on rawImage creation
    rawImageService.createSource.subscribe((rawImage: RawImage) => {
      let image = new Image(null, rawImage.id, 'default', 0, 0, rawImage.width, rawImage.height);
      this.create(image);
    });

    rawImageService.createSource.subscribe(() => {})
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
}
