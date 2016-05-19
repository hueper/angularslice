import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { ViewComponent } from '../view';

@Component({
  selector: 'project',
  template: require('./project.component.jade')(),
  styles: [ require('./project.component.scss') ],
  directives: [
    ROUTER_DIRECTIVES
  ]
})
@Routes([
  { path: 'views/:viewId', component: ViewComponent }
])
export class ProjectComponent {
}
