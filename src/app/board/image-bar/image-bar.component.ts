import {Component} from "@angular/core";
import {ImageService} from "../../shared/services";
import {Image} from "../../shared/models";

@Component({
  selector: 'image-bar',
  template: require('./image-bar.component.jade')(),
  styles: [ require('./image-bar.component.scss') ],
  providers: [],
  pipes: [],
  directives: [],
})
export class ImageBarComponent {
  images: Image[] = [];

  constructor(
    private imageService: ImageService
  ) {
    this.images = this.imageService.find();
  }

}
