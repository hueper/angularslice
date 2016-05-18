import { Component } from '@angular/core';
import { RouteSegment, OnActivate } from '@angular/router';

@Component({
  selector: 'welcome',
  template: require('./welcome.component.jade')()
})
export class WelcomeComponent implements OnActivate {
  routerOnActivate(curr: RouteSegment): void {
    // console.debug('-- curr', curr);
  }
}
