import {Component, OnDestroy} from "@angular/core";
import {ImageService} from "../../shared/services";
import {Image} from "../../shared/models";
import {Subscription} from "rxjs";

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
  private hover:boolean = false;

  constructor(
    private imageService: ImageService
  ) {
    this.subscriptions.push(this.imageService.dataSource.subscribe((data: Image[]) => {
      this.images = data;
    }));
    // this.subscriptions.push(this.imageService.currentImage.subscribe((data: Image) => {
    //   console.log(data);
    // }));
  }

  deleteImage(image) {
    this.imageService.delete(image);
  }

  onDragOver(event) {
    event.preventDefault();
    this.hover = true;
    return false;
  }

  onDrop(event) {
    event.preventDefault();
    console.debug("dropped => ", arguments);
    return false;
  }

  onDragEnter(event) {
    this.hover = true;
    return false;
  }

  onDragExit(event) {
    this.hover = false;
    return false;
  }

  getImage(image) {
    return this.imageService.getBinaryData(image);
  }

  setBoardImage(image) {
    this.imageService.setCurrentImage(image)
  }

  ngOnDestroy() {
    _.each(this.subscriptions, subscription => {
      subscription.unsubscribe();
    });
  }

}
