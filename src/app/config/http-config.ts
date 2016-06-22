import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfig extends Http {
  baseUrl: string = 'http://192.168.1.102:3000/api';

  post(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response> {
    url = this.baseUrl + url;

    if (!options) {
      options = { withCredentials: true };
    } else {
      options.withCredentials = true;
    }

    return super.post(url, body, options);
  }

  // merge(options?: RequestOptionsArgs): RequestOptions {
  //   options.url = 'http://192.168.1.102:3000/api';
  //   return super.merge(options);
  // }
}
