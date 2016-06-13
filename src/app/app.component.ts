import { Component, Injectable, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { EditorComponent } from './editor';
import {DialogService} from "./shared/services/dialog.service";

@Injectable()
@Component({
  selector: 'app',
  providers: [
    Modal,
    ...BS_MODAL_PROVIDERS,
    DialogService
  ],
  pipes: [],
  directives: [
    ROUTER_DIRECTIVES,
  ],
  template: require('./app.component.jade')(),
  styles: [ require('./app.component.scss') ]
})
@Routes([
  { path: '/', component: EditorComponent}
])
export class AppComponent implements AfterViewInit {

  constructor(
    private router: Router,
    private modal: Modal,
    private viewContainer: ViewContainerRef
  ) {

    modal.defaultViewContainer = viewContainer;
  }

  ngAfterViewInit() {
  }

}
