import { Component } from '@angular/core';
import { ModalComponent, DialogRef } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {MdButton} from '@angular2-material/button';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import { Folder } from '../shared/models';
import { FolderService } from '../shared/services';

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
    FolderService
  ]
})
export class ComponentDialog implements ModalComponent<ComponentDialogData> {
  component: any;
  public folders: Folder[];

  constructor(
    public dialog: DialogRef<ComponentDialogData>,
    private folderService: FolderService
  ) {
    folderService.dataSource.subscribe((folders: Folder[]) => {
      this.folders = folders;
    });
    this.component = {
      type: 'new',
      attach: true,
      folder: null,
    }
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
  }

  close() {
    this.dialog.dismiss();
  }
}
