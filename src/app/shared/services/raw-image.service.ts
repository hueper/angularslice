import { Injectable} from '@angular/core';

import { RawImage } from '../models';

@Injectable()
export class RawImageService {
  rawImages: RawImage[];
  
  constructor() {
    
  }
  
  create(rawImage: RawImage) {
    this.rawImages.push(rawImage);
  }
  
  read(filterObject: any) {
    
  }
  
  update() {
    
  }
  
  delete() {
    
  }
  
  
}