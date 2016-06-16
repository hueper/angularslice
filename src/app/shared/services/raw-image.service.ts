import {Injectable, NgZone} from "@angular/core";
import {RawImage} from "../models";
import {BaseService} from "./base.service";

// import {NgZone} from '@angular/core'

@Injectable()
export class RawImageService extends BaseService<RawImage> {

  constructor(// private ApplicationRef:ApplicationRef
    private NgZone:NgZone) {
    super();

    // TODO: this is just test data
    // this.create(new RawImage('http://s33.postimg.org/aqd0rerum/page1.jpg', 700, 800));
    // this.create(new RawImage('http://s33.postimg.org/53ufz5tha/page2.jpg', 700, 800));
    // this.create(new RawImage('http://s33.postimg.org/gu8dgjm9q/page3.jpg', 700, 800));
    // this.create(new RawImage('http://s33.postimg.org/kdp998iny/page4.jpg', 700, 800));
  }

  create(rawImage: RawImage) {
    super.create(rawImage);

    // We're going out from Zone, so after the create we'll need to trigger the change detection chain
    // this.ApplicationRef.tick();
  }

  createFromFile(file: any) {
    const reader  = new FileReader();

    reader.addEventListener('load', (e:any) => {
      let image = new Image();
      image.src = e.target.result;
      let binaryData = image.src;

      image.onload = () => {
        this.NgZone.run(() => {
          let width = image.width;
          let height = image.height;
          this.create(new RawImage(binaryData, width, height));
        });
      };

    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }


}
