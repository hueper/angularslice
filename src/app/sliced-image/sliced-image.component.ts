import {Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, NgZone} from "@angular/core";
import {Image} from "../shared/models/";
import {ImageService} from "../shared/services";

@Component({
  selector: 'sliced-image',
  styles: [require('./sliced-image.component.scss')],
  template: require('./sliced-image.component.jade')()
})

export class SlicedImage implements AfterViewInit, OnChanges {
  @ViewChild('canvas') myCanvas;

  @Input()
  image:Image;
  @Input()
  thumbnail:boolean;

  public width:number;
  public height:number;

  public scaleWidth:number;
  public scaleHeight:number;


  constructor(private imageService:ImageService,
              private el:ElementRef,
              private ngZone:NgZone) {

  }

  draw() {
    this.ngZone.run(() => {
      if (this.myCanvas) {

        let canvas = this.myCanvas.nativeElement;
        let rawImage = this.imageService.getRawImage(this.image);
        let ctx = canvas.getContext('2d');
        let img = document.createElement('img');
        let canvasSize;

        img.src = rawImage.binaryData;
        img.onload = () => {
          let dest = this.el.nativeElement;
          canvasSize = this.generateSizeLandscape(dest.offsetWidth, this.image.width, this.image.height);
          if (canvasSize.height > dest.offsetHeight) {
            canvasSize = this.generateSizePortrait(dest.offsetHeight, this.image.width, this.image.height);
          }

          this.width = canvas.width = canvasSize.width;
          this.height = canvas.height = canvasSize.height;

          this.scaleWidth = this.width / this.image.width;
          this.scaleHeight = this.height / this.image.height;

          ctx.drawImage(img, this.image.x, this.image.y, this.image.width, this.image.height, 0, 0, canvasSize.width, canvasSize.height);
        };
      }
    })
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
