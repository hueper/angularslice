import {Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges} from '@angular/core';
import {Image} from '../shared/models/';
import {ImageService} from '../shared/services';

@Component({
  selector: 'sliced-image',
  styles: [require('./sliced-image.component.scss')],
  template: require('./sliced-image.component.jade')()
})

export class SlicedImage implements AfterViewInit, OnChanges {
  @ViewChild('canvas') myCanvas;

  @Input()
  image:Image;

  constructor(private imageService:ImageService,
              private el:ElementRef) {

  }

  draw() {
    if (this.myCanvas) {
      let canvas = this.myCanvas.nativeElement;
      let rawImage = this.imageService.getRawImage(this.image);
      let ctx = canvas.getContext('2d');
      let img = document.createElement('img');
      let canvasSize;
      console.log(this.image)

      img.src = rawImage.binaryData;
      img.onload = () => {
        let dest = this.el.nativeElement;
        canvasSize = this.generateSizeLandscape(dest.offsetWidth, this.image.width, this.image.height);
        if (canvasSize.height > dest.offsetHeight) {
          canvasSize = this.generateSizePortrait(dest.offsetHeight, this.image.width, this.image.height);
        }

        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        ctx.drawImage(img, this.image.x, this.image.y, this.image.width, this.image.height, 0, 0, canvasSize.width, canvasSize.height);
      };
    }
  }

  ngOnChanges() {
    this.draw();
  }

  ngAfterViewInit() {
    this.draw();
  }

  generateSizeLandscape(dx, sx, sy) {
    return {
      width: dx,
      height: dx * sy / sx
    };
  }

  generateSizePortrait(dy, sx, sy) {
    return {
      width: dy * sx / sy,
      height: dy
    };
  }

  getImage() {
    return this.imageService.getBinaryData(this.image);
  }
}
