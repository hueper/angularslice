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

    let fileNameSegments = file.name.split('.');

    reader.addEventListener('load', (e:any) => {
      let type = 'image/' + fileNameSegments[fileNameSegments.length - 1];
      let blob = new Blob([new Uint8Array(e.target.result)], {type: type});

      let urlCreator = window.URL;
      let imageUrl = urlCreator.createObjectURL(blob);

      let image = new Image();
      image.src = imageUrl;
      // let binaryData = image.src;

      image.onload = () => {
        this.NgZone.run(() => {
          let width = image.width;
          let height = image.height;
          this.create(new RawImage(blob, type, width, height));
        });
      };

    }, false);

    if (file) {
      reader.readAsArrayBuffer(file);
    }

  }


}
