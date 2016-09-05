import { Injectable, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Modal } from 'angular2-modal/providers';

import {
  ComponentDialogComponent,
  ConfirmDialogComponent,
  ConfirmDialogData,
  GithubDialogComponent,
  ExportDialogComponent
} from '../../dialogs';

@Injectable()
export class DialogService {

  constructor(
    private overlay: Overlay,
    vcRef: ViewContainerRef,
    private modal: Modal
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  openGithubDialog() {
    const data = new BSModalContext();
    return this.modal
               .open(GithubDialogComponent, data)
               .then(dialog => {
                 return dialog.result;
               })
               .catch(err => {
                 console.log(err);
                 return null;
               });
  }

  openExportDialog(): Promise<any> {
    const data = new BSModalContext();
    return this.modal
               .open(ExportDialogComponent, data)
               .then(dialog => {
                 return dialog.result;
               })
               .catch(err => {
                 console.log(err);
                 return null;
               });
  }

  openCreateComponentDialog(hasImage: boolean = true) {
    const data = new BSModalContext();
    data["hasImage"] = hasImage;

    return this.modal
               .open(ComponentDialogComponent, data)
               .then(dialog => {
                 return dialog.result;
               })
               .catch(err => {
                 console.log(err);
                 return null;
               });
  }

  openConfirmDialog() {
    console.log(this.overlay);
    return this.modal
      // .confirm()
      .open(ConfirmDialogComponent, new ConfirmDialogData());
      // .alert()
      // .size('lg')
      // .showClose(true)
      // .title('A simple Alert style modal window')
      // .body(require('../../dialogs/confirm-dialog/confirm-dialog.pug'))
      // .open();

    // const data = new ConfirmDialogData();
    // return this.modal
    //            .open(ConfirmDialogComponent, data)
    //            .then(dialog => {
    //              return dialog.result;
    //            })
    //            .catch(err => {
    //              console.log(err);
    //              return null;
    //            });
  }
}
