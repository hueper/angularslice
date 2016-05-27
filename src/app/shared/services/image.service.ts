import { Injectable} from '@angular/core';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Image, RawImage } from '../models';

@Injectable()
export class ImageService {
  images: Image[] = [];
  imagesSource: BehaviorSubject<Image[]> = new BehaviorSubject([]);

  constructor() {

  }

  createFromRawImage(rawImage: RawImage) {
    let image = new Image(rawImage.id, 'default', 0, 0, rawImage.width, rawImage.height);
    this.create(image);
  }
  
  create(image: Image) {
    this.images.push(image);
    this.imagesSource.next(this.images);
  }
  
  update(image: Image) {
    
  } 
  
  delete(image: Image) {
    
  }
}