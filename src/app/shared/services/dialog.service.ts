import { Injectable, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Modal } from 'angular2-modal/plugins/bootstrap'

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
    // private overlay: Overlay,
    // vcRef: ViewContainerRef,
    private modal: Modal
  ) {
    // overlay.defaultViewContainer = vcRef;
  }

  openGithubDialog() {
    const data = new BSModalContext();
    return this.modal
               .open(GithubDialogComponent, { context: data })
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
               .open(ExportDialogComponent, { context: data })
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
               .open(ComponentDialogComponent, { context: data })
               .then(dialog => {
                 return dialog.result;
               })
               .catch(err => {
                 console.log(err);
                 return null;
               });
  }

  openConfirmDialog() {
    return this.modal
                .open(ConfirmDialogComponent, { context: new ConfirmDialogData() })
                .then(dialog => {
                  return dialog.result;
                })
                .catch(err => {
                  console.log(err);
                  return null;
                });
  }
}
