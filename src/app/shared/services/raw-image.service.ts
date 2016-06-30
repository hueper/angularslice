import { Injectable, NgZone } from "@angular/core";
import { Http, Headers } from "@angular/http";
const Humane = require('humane-js');

import { RawImage } from "../models";
import { BaseService } from "./base.service.ts";
import { HttpService } from "./http.service.ts";

// import {NgZone} from '@angular/core'

@Injectable()
export class RawImageService extends BaseService<RawImage> {
  constructor( // private ApplicationRef:ApplicationRef
    private httpService: HttpService,
    private ngZone: NgZone) {
    super('rawImages', RawImage);
  }

  delete(rawImage: RawImage) {
    return this.httpService.delete(`/rawImages/${rawImage._id}`)
               .map(res => res.json())
               .share()
               .subscribe((res: any) => {
                 if (res.success) {
                   // Delete locally
                   super.delete(rawImage);
                 }
               });
  }

  create(rawImage: RawImage) {
    super.create(rawImage);

    // We're going out from Zone, so after the create we'll need to trigger the change detection chain
    // this.ApplicationRef.tick();
  }

  createFromFile(file: any): Promise<any> {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', (e: any) => {
        let image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          const width = image.width;
          const height = image.height;
          const fileType = image.src.split(';')[0].split(':')[1];

          this.ngZone.run(() => {

            let formData = new FormData();
            formData.append('width', width);
            formData.append('height', height);
            formData.append('target', file, fileType);

            this.httpService.post('/rawImages/upload', formData)
                .map(res => res.json())
                .subscribe((res: any) => {
                  const data = res.data;

                  if (res.success) {
                    this.create(new RawImage(data._id, data.url, data.width, data.height, file.name));
                    resolve(res);
                  } else {
                    Humane.log('Sorry, something baaad happened o.O');
                  }
                });

          });
        };

      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }


}
