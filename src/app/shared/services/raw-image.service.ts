import { Injectable, NgZone } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { RawImage } from "../models";
import { BaseService } from "./base.service";

// import {NgZone} from '@angular/core'

@Injectable()
export class RawImageService extends BaseService<RawImage> {

  constructor(// private ApplicationRef:ApplicationRef
    private Http: Http,
    private NgZone: NgZone) {
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
    const reader = new FileReader();

    reader.addEventListener('load', (e: any) => {
      let image = new Image();
      image.src = e.target.result;
      let binaryData = image.src;

      image.onload = () => {
        this.NgZone.run(() => {
          let formData = new FormData();
          console.debug(image.src.substr(0, 50));
          //image.src.split(';')[0]
          formData.append('width', image.width);
          formData.append('height', image.height);
          formData.append('target', file, 'image/jpeg');

          this.Http.post('http://localhost:3000/api/rawImages/upload', formData).subscribe(result => {
            console.log(result);
            
          });
          let width = image.width;
          let height = image.height;

          this.create(new RawImage(binaryData, width, height, file.name));

          // var headers = new Headers();
          // headers.append('Content-Type', 'application/x-www-form-urlencoded');
          //
          // console.log(file);
          //
          // const params = { width, height, target: file };
          // localStorage.setItem('testrequest', JSON.stringify(params));
          // // const params = JSON.parse(localStorage.getItem('testrequest'));
          //
          // this.http.post('http://192.168.1.102:3000/api/rawImages/upload', params, { headers: headers }).subscribe(response => {
          //   console.log(response, 'HERE IS THE RESP');
          //   // this.create(new RawImage(binaryData, width, height, file.name));
          // });



          // Upload to the server
          // TODO: put the request into a separate service
          // this.http.post('http://192.168.1.102:3000/api/rawImages/upload', params).subscribe(response => {
          //   console.log(response, 'HERE IS THE RESP');
          // });

        });
      };

    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }


}
