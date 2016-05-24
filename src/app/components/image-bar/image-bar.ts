import { Component } from '@angular/core';
import { ImageService } from '/src/app/services';

@Component({
  selector: 'image-bar',
  template: require('./image-bar.jade')(),
  styles: [ require('./image-bar.scss') ],
  providers: [],
  pipes: [],
  directives: [],
})
export class ImageBarComponent {

  constructor() {

  }

}