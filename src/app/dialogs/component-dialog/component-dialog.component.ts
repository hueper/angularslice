import * as _ from "lodash";
import { Component, OnDestroy } from "@angular/core";
import { ModalComponent, DialogRef } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { MdButton } from "@angular2-material/button";
import { MdInput } from "@angular2-material/input";
import { MdCheckbox } from "@angular2-material/checkbox";
import { MdRadioButton, MdRadioGroup, MdRadioDispatcher } from "@angular2-material/radio";
import { Subscription } from "rxjs";
const Humane = require('humane-js');

import { Folder } from "../../shared/models";
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
    MdRadioButton
  ],
  providers: [
    MdRadioDispatcher
  ]
})
export class ComponentDialogComponent implements ModalComponent<BSModalContext>, OnDestroy {
  component: any;
  public folders: Folder[];
  private subscriptions: Subscription[] = [];
  private hasImage: boolean = true;
  
  constructor(public dialog: DialogRef<BSModalContext>,
              private folderService: FolderService) {
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
      this.send();
    }
  }
  
  ngOnDestroy() {
    _.each(this.subscriptions, subscription => {
      subscription.unsubscribe();
    });
  }
  
  changeAttachImage(event) {
    this.component.attach = event.checked;
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
  
  close() {
    this.dialog.dismiss();
  }
}
