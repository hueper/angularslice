import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';
import {DialogService} from "./shared/services/dialog.service";


@Component({
  selector: 'app',
  providers: [
    Modal,
    ...BS_MODAL_PROVIDERS,
    DialogService
  ],
  pipes: [],
  directives: [ ROUTER_DIRECTIVES ],
  template: require('./app.component.jade')(),
  styles: [ require('./app.component.scss') ]
})
export class AppComponent implements AfterViewInit {

  constructor(
    private modal: Modal,
    private viewContainer: ViewContainerRef
  ) {

    modal.defaultViewContainer = viewContainer;
  }

  ngAfterViewInit() {
  }

}
