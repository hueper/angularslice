import {Component, OnDestroy} from "@angular/core";
import {ImageService} from "../../shared/services";
import {Image} from "../../shared/models";
import { Subscription } from 'rxjs';

@Component({
  selector: 'image-bar',
  template: require('./image-bar.component.jade')(),
  styles: [ require('./image-bar.component.scss') ],
  providers: [],
  pipes: [],
  directives: [],
})
export class ImageBarComponent implements OnDestroy {
  images: Image[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private imageService: ImageService
  ) {
    this.subscriptions.push(this.imageService.dataSource.subscribe((data: Image[]) => {
      console.log(data);
      this.images = data;
      if (!data.length) return;
      // this.currentImage = data[0];
      //
      // // this.imageContainerStyle['display'] = 'initial';
      // this.imageContainerStyle['width'] = this.currentImage.width + 'px';
      // this.imageContainerStyle['height'] = this.currentImage.height + 'px';
      // this.imageContainerStyle['background-image'] = 'url(' + this.imageService.getBinaryData(this.currentImage) + ')';
    }));
  }

  ngOnDestroy() {
    _.each(this.subscriptions, subscription => {
      subscription.unsubscribe();
    });
  }

}
