import * as _ from "lodash";
import { Component, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { ModalComponent, DialogRef } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { MdButton } from "@angular2-material/button";
import { MD_ICON_DIRECTIVES } from "@angular2-material/icon/icon";
import { MdInput } from "@angular2-material/input";
import { MdCheckbox } from "@angular2-material/checkbox";
import { MdRadioButton, MdRadioGroup, MdRadioDispatcher } from "@angular2-material/radio";
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
import { Subscription } from "rxjs";
const Humane = require('humane-js');

import { Folder } from "../../shared/models";
import { TooltipDirective } from "../../shared/directives";
import { FolderService } from "../../shared/services";

@Component({
  selector: 'component-dialog',
  template: require('./component-dialog.jade')(),
  styles: [require('./component-dialog.component.scss')],
  directives: [
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MD_ICON_DIRECTIVES,
    TooltipDirective
  ],
  providers: [
    MdRadioDispatcher
  ]
})
export class ComponentDialogComponent implements ModalComponent<BSModalContext>, OnDestroy, AfterViewInit {
  component: any;
  
  @ViewChild('componentName') private componentName: any;
  
  public folders: Folder[];
  private subscriptions: Subscription[] = [];
  private hasImage: boolean = true;
  
  constructor(public dialog: DialogRef<BSModalContext>,
              private ga: Angulartics2GoogleAnalytics,
              private folderService: FolderService,
              private detector: ChangeDetectorRef
  ) {
    this.subscriptions.push(folderService.dataSource.subscribe((folders: Folder[]) => {
      this.folders = folders;
    }));
    this.component = {
      type: 'new',
      attach: true,
      folder: null,
    };
    
    this.hasImage = this.dialog.context['hasImage'];
  }
  
  eventHandler(event) {
    if (event.which === 13) {
      event.preventDefault();
      this.send();
      return false;
    }
  }
  
  ngOnDestroy() {
    _.each(this.subscriptions, subscription => {
      subscription.unsubscribe();
    });
  }
  
  changeAttachImage(event) {
    this.component.attach = event.checked;
    if (!event.checked) {
      this.ga.eventTrack('selectNoImage', { category: 'areaDialog' });
    }
  }
  
  changeExistingComponent() {
    this.ga.eventTrack('selectExistingComponent', { category: 'areaDialog' });
  }
  
  send() {
    if (this.component.type === 'new' && !this.component.newFolderName) {
      Humane.log('Component name is missing', { timeout: 4000, clickToClose: true });
      return;
    }
    let result = {
      action: 'save',
      data: this.component
    };
    this.dialog.close(result);
  }
  
  ngAfterViewInit(): any {
    if(!this.hasImage) {
      if(this.componentName) {
        this.componentName.focus();
        this.detector.detectChanges();
      }
    }
  }
  
  close() {
    this.dialog.dismiss();
  }
}
