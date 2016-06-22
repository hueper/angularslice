import { Injectable } from '@angular/core';
import { Http, RequestOptions } from "@angular/http";

@Injectable()
export class HttpService {
  private baseUrl: string = 'http://192.168.1.103:3000/api';
  private defaultRequestOptions: RequestOptions = new RequestOptions({ withCredentials: true });

  constructor(
    private http: Http
  ) {}

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
