import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { HttpService, HttpResponse } from './http.service.ts';
import { User } from '../models';
import { Observable } from "rxjs/Rx";

@Injectable()
export class UserService {
  userSource: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private httpService: HttpService) {
    // this.pollUser();
  }

  // pollUser(): Observable<HttpResponse<User>> {
  //   let observable = this.httpService.get('/users/me')
  //                        .map(res => res.json());
  //
  //   observable.subscribe((res: HttpResponse<User>) => {
  //     this.userSource.next(res.data);
  //   });
  //
  //   return observable;
  // }


}
