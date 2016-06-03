import * as _ from "lodash";
import { Component, OnDestroy } from '@angular/core';

import { ModalComponent, DialogRef } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { MdButton } from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdRadioButton, MdRadioGroup, MdRadioDispatcher } from '@angular2-material/radio';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { Folder } from '../shared/models';
import { FolderService } from '../shared/services';
import { Subscription } from 'rxjs';

export class ComponentDialogData extends BSModalContext {
  constructor() {
    super();
  }
}

@Component({
  selector: 'component-dialog',
  template: require('./component_dialog.jade')(),
  styles: [require('./component_dialog.component.scss')],
  directives: [
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon
  ],
  providers: [
    MdRadioDispatcher,
    MdIconRegistry,
  ]
})
export class ComponentDialog implements ModalComponent<BSModalContext>, OnDestroy {
  component: any;
  public folders: Folder[];
  private subscriptions: Subscription[] = [];

  constructor(
    public dialog: DialogRef<BSModalContext>,
    private folderService: FolderService
  ) {
    this.subscriptions.push(folderService.dataSource.subscribe((folders: Folder[]) => {
      this.folders = folders;
      console.log(folders);
    }));
    this.component = {
      type: 'new',
      attach: true,
      folder: null,
    }
  }


  onKeyUp(value) {
    console.log(value);
  }

  ngOnDestroy() {
    _.each(this.subscriptions, subscription => {
      subscription.unsubscribe();
    });
  }

  changeAttachImage(event) {
    this.component.attach = event.checked;
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  send() {
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
