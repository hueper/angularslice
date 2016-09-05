import { Injectable, NgZone } from "@angular/core";
import { Http, Headers } from "@angular/http";
const Humane = require('humane-js');

import { RawImage } from "../models";
import { BaseService } from "./base.service.ts";
import { HttpService } from "./http.service.ts";
import { AnalyticsService } from "./analytics.service";

// import {NgZone} from '@angular/core'

@Injectable()
export class RawImageService extends BaseService<RawImage> {
  constructor( // private ApplicationRef:ApplicationRef
    private httpService: HttpService,
    private ga: AnalyticsService,
    private ngZone: NgZone) {
    super('rawImages', RawImage);
  }

  delete(rawImage: RawImage) {
    // localStorage.removeItem(rawImage._id);
    super.delete(rawImage);
    // return this.httpService.delete(`/rawImages/${rawImage._id}`)
    //            .map(res => res.json())
    //            .share()
    //            .subscribe((res: any) => {
    //              if (res.success) {
    //                Delete locally
                   // super.delete(rawImage);
                 // }
               // });
  }

  create(rawImage: RawImage) {
    super.create(rawImage);

    // We're going out from Zone, so after the create we'll need to trigger the change detection chain
    // this.ApplicationRef.tick();
  }

  createFromFile(file: any): Promise<any> {

    // Supported extensions
    const supportedFileExtension = ['jpg', 'png', 'jpeg'];
    const extension = file.name.split('.').pop();

    return new Promise((resolve, reject) => {
      // Check extensions
      if (supportedFileExtension.indexOf(extension) === -1) {
        Humane.log(`Sorry we support just 'png' and 'jpg' files at the moment.`, { timeout: 4000, clickToClose: true });
        this.ga.eventTrack('upload', { category: extension });
        reject();
      }

      this.ga.eventTrack('upload', { category: 'supportedExentension' });

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

            this.create(new RawImage(Math.random().toString(), image.src, width, height, file.name));
            resolve(true);

            // this.httpService.post('/rawImages/upload', formData)
            //     .map(res => res.json())
            //     .subscribe((res: any) => {
            //       const data = res.data;
            //
            //       if (res.success) {
            //         this.create(new RawImage(data._id, data.url, data.width, data.height, file.name));
            //         resolve(res);
            //       } else {
            //         Humane.log('Sorry, something baaad happened o.O');
            //       }
            //     });

          });
        };

      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }


}
