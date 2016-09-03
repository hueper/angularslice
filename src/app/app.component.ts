import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';
// Strange, but true: this method would work but throws an error: 'cannot find module'
// import * as Humane from 'humane-js/humane.js';

import { TooltipService, DialogService } from "./shared/services";


@Component({
  selector: 'app',
  providers: [
    DialogService,
  ],
  template: require('./app.component.pug')(),
  styles: [require('./app.component.scss')]
})
export class AppComponent implements AfterViewInit {

  constructor(
              private overlay: Overlay,
              private modal: Modal,
              private viewContainer: ViewContainerRef,
              private tooltipService: TooltipService
  ) {
    overlay.defaultViewContainer = viewContainer;
    tooltipService.viewContainer = viewContainer;
  }

  ngAfterViewInit() {
  }

}
