import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';

import {
  AreaService,
  DialogService,
  FileService,
  FolderService,
  ImageService,
  RawImageService,
  TemplateService
} from "./shared/services";

@Component({
  selector: 'app',
  providers: [
    Modal,
    ...BS_MODAL_PROVIDERS,
    DialogService,
    AreaService,
    FileService,
    FolderService,
    ImageService,
    RawImageService,
    TemplateService,
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
