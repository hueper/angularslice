import { Injectable } from '@angular/core';

import { RawImage } from '../models';
import { BaseService } from './base.service';

@Injectable()
export class RawImageService extends BaseService<RawImage> {

  constructor() {
    super();
  }
  
  create(rawImage: RawImage) {
    super.create(rawImage);
  }

  createFromFile(file: any) {
    const reader  = new FileReader();

    reader.addEventListener('load', (e:any) => {
      let image = new Image();
      image.src = e.target.result;
      let binaryData = image.src;

      image.onload = () => {
        let width = image.width;
        let height = image.height;
        this.create(new RawImage(binaryData, width, height));
      };

    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
    
  }
  
  
}