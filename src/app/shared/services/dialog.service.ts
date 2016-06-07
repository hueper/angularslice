import * as _ from "lodash";
import {Injectable} from '@angular/core';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {ComponentDialog} from '../../component_dialog/component_dialog.component';
import {ConfirmDialog, ConfirmDialogData} from '../../confirm_dialog/confirm_dialog.component';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class DialogService {

  constructor(private modal:Modal) {

  }

  openCreateComponentDialog(callback) {
    const data = new BSModalContext();
    this.modal
      .open(ComponentDialog, data)
      .then(dialog => {
        dialog.result.then(data => {
          callback(data);
        })
      });
  }

  openConfirmDialog() {
    let promise = new Promise((resolve, reject) => {
      const data = new ConfirmDialogData();
      this.modal
        .open(ConfirmDialog, data)
        .then(dialog => {
          dialog.result.then(data => {
            console.log(promise);
            if (data && data === true) {
              resolve("confirm");
            } else {
              reject('error');
            }
          }).catch(() => reject('error'))
        }).catch(() => reject('error'));
    });
    return promise;
  }
}

/*
USING CONFIRM
 this.dialogService.openConfirmDialog().then((result) => {
  console.log("Dialog result", result);
 }).catch(data => {
  console.log('data => ', data);
 });
 */
