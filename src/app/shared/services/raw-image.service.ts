import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RawImage } from '../models';
import { ImageService } from './image.service';

@Injectable()
export class RawImageService {
  rawImages: RawImage[] = [];
  rawImagesSource: BehaviorSubject<RawImage[]> = new BehaviorSubject([]);
  imageService: ImageService;
  
  constructor(imageService: ImageService) {
    this.imageService = imageService;
  }
  
  create(rawImage: RawImage) {
    this.rawImages.push(rawImage);
    this.rawImagesSource.next(this.rawImages);
    
    // Create an image from this data !
    this.imageService.createFromRawImage(rawImage);
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
  
  findOne(filterObject: any): RawImage {
    return _.find(this.rawImages, filterObject);
  }

  find(filterObject: any): RawImage[] {
    return _.filter(this.rawImages, filterObject);
  }
  
  update() {
    
  }
  
  delete() {
    
  }
  
  
}