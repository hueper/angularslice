import { Component, Injectable, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';
import {
  Routes,
  Route,
  Router,
  ROUTER_DIRECTIVES
} from '@angular/router';

import { ProjectComponent } from './components/project';


@Injectable()
@Component({
  selector: 'app',
  providers: [
    Modal,
    ...BS_MODAL_PROVIDERS
  ],
  pipes: [],
  directives: [
    ROUTER_DIRECTIVES
  ],
  template: require('./app.component.jade')()
})
@Routes([
  { path: '/projects/:projectId', component: ProjectComponent },
  { path: '/', component: ProjectComponent}
])
export class AppComponent implements AfterViewInit {

  constructor(private router: Router,
              private modal: Modal,
              private viewContainer: ViewContainerRef) {

    modal.defaultViewContainer = viewContainer;
  }

  ngAfterViewInit() {
  }

}
