import { Component, Input } from '@angular/core';
import { Image } from '../shared/models/';
import { ImageService } from '../shared/services';

@Component({
  selector: 'sliced-image',
  styles: [ require('./sliced-image.component.scss') ],
  template: require('./sliced-image.component.jade')()
})

export class SlicedImage {
  @Input()
  image: Image;
  constructor(private imageService: ImageService) {
    console.log(this.image);
  }
  getImage() {
    return this.imageService.getBinaryData(this.image);
  }

}
