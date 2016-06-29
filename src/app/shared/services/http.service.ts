import { Injectable } from '@angular/core';
import { Http, RequestOptions } from "@angular/http";

declare var __DEV__;

export interface HttpResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errorObject?: any;
}

@Injectable()
export class HttpService {

  private baseUrl: string;
  private defaultRequestOptions: RequestOptions = new RequestOptions({ withCredentials: true });

  constructor(private http: Http) {
    if (__DEV__) {
      this.baseUrl = 'http://192.168.1.107:3000/api';
    } else {
      this.baseUrl = '/api';
    }
  }

  post(path: string, body: any = {}, requestOptions: RequestOptions = this.defaultRequestOptions) {
    return this.http.post(this.baseUrl + path, body);
  }

  get(path: string, body: any = {}, requestOptions: any = this.defaultRequestOptions) {
    return this.http.get(this.baseUrl + path, body);
  }

  put(path: string, body: any = {}, requestOptions: any = this.defaultRequestOptions) {
    return this.http.put(this.baseUrl + path, body);
  }

  delete(path: string) {
    return this.http.delete(this.baseUrl + path);
  }

}
