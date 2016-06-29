import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
// Strange, but true: this method would work but throws an error: 'cannot find module'
// import * as Humane from 'humane-js/humane.js';

import { TooltipService, DialogService } from "./shared/services";


@Component({
  selector: 'app',
  providers: [
    TooltipService,
    Modal,
    ...BS_MODAL_PROVIDERS,
    DialogService,
    Angulartics2GoogleAnalytics,
  ],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.component.jade')(),
  styles: [require('./app.component.scss')]
})
export class AppComponent implements AfterViewInit {
  
  constructor(private modal: Modal,
              private viewContainer: ViewContainerRef,
              private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    
    // Just an example for GA
    // setTimeout( () => {
    //   angulartics2GoogleAnalytics.eventTrack('testing', { category: 'ngslice' });
    //   console.log('DONE');
    // }, 1000);
    
    modal.defaultViewContainer = viewContainer;
  }
  
  ngAfterViewInit() {
  }
  
}
