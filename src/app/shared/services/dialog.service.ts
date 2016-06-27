import { Injectable } from '@angular/core';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {
  ComponentDialogComponent,
  ConfirmDialogComponent,
  ConfirmDialogData,
  GithubDialogComponent,
  ExportDialogComponent
} from '../../dialogs';

@Injectable()
export class DialogService {

  constructor(private modal: Modal) {

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

  openCreateComponentDialog() {
    const data = new BSModalContext();
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
    const data = new ConfirmDialogData();
    return this.modal
               .open(ConfirmDialogComponent, data)
               .then(dialog => {
                 return dialog.result;
               })
               .catch(err => {
                 console.log(err);
                 return null;
               });
  }
}
