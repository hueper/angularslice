import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { HttpService } from './http.service.ts';
import { User } from '../models';

@Injectable()
export class UserService {
  userSource: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private httpService: HttpService
  ) {
    this.pollUser();
  }

  pollUser() {
    // this.userSource.next();
    return this.userSource;

    // let observable = this.httpService.get('/users/me')
    //   .map(res => res.json());
    //
    // observable.subscribe(res => {
    //   this.userSource.next(res.data);
    // });

    // return observable;
  }




}
