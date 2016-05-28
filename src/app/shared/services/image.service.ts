import { Injectable} from '@angular/core';

import { Image, RawImage } from '../models';
import { BaseService } from './base.service';
import { RawImageService } from './raw-image.service';

@Injectable()
export class ImageService extends BaseService<Image> {

  constructor(
    private rawImageService: RawImageService)
  {
    super();

    // Automatically create an image on rawImage creation
    rawImageService.createSource.subscribe((rawImage: RawImage) => {
      let image = new Image(rawImage.id, 'default', 0, 0, rawImage.width, rawImage.height);
      this.create(image);
    });
  }

  getBinaryData (instance: Image) {
    const rawImage = this.rawImageService.findById(instance.rawImageId);
    console.log(rawImage);
    return rawImage ? rawImage.binaryData : null;
  }
}