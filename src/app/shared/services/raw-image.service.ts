import { Injectable } from '@angular/core';

import { RawImage } from '../models';
import { BaseService } from './base.service';

@Injectable()
export class RawImageService extends BaseService<RawImage> {

  constructor() {
    super();

    // TODO: this is just test data
    this.create(new RawImage('http://s33.postimg.org/aqd0rerum/page1.jpg', 700, 800));
    this.create(new RawImage('http://s33.postimg.org/53ufz5tha/page2.jpg', 700, 800));
    this.create(new RawImage('http://s33.postimg.org/gu8dgjm9q/page3.jpg', 700, 800));
    this.create(new RawImage('http://s33.postimg.org/kdp998iny/page4.jpg', 700, 800));
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