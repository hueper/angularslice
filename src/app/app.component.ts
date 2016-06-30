import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';
// Strange, but true: this method would work but throws an error: 'cannot find module'
// import * as Humane from 'humane-js/humane.js';

import { TooltipService, DialogService } from "./shared/services";


@Component({
  selector: 'app',
  providers: [
    Modal,
    ...BS_MODAL_PROVIDERS,
    DialogService,
  ],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.component.jade')(),
  styles: [require('./app.component.scss')]
})
export class AppComponent implements AfterViewInit {

  constructor(private modal: Modal,
              private viewContainer: ViewContainerRef,
              private tooltipService: TooltipService
  ) {
    modal.defaultViewContainer = viewContainer;
    tooltipService.viewContainer = viewContainer;
  }

  ngAfterViewInit() {
  }

}
