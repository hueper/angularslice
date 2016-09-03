import * as _ from "lodash";
import { Component, OnDestroy } from '@angular/core';
import { ModalComponent, DialogRef } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ConfirmData } from '../../shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'confirm-dialog',
  template: require('./confirm-dialog.pug')(),
  styles: [require('./confirm-dialog.component.scss')],
})
export class ConfirmDialogComponent implements ModalComponent<ConfirmDialogData>, OnDestroy {
  private subscriptions: Subscription[] = [];
  private context: ConfirmDialogData;
  private confirmData: ConfirmData;

  constructor(
    public dialog: DialogRef<ConfirmDialogData>
  ) {
    this.context = dialog.context;
    this.confirmData = this.context.confirmData;
  }

  ngOnDestroy() {
    _.each(this.subscriptions, subscription => {
      subscription.unsubscribe();
    });
  }

  yes() {
    this.dialog.close(true);
  }

  cancel() {
    this.dialog.dismiss();
  }

}


export class ConfirmDialogData extends BSModalContext {
  public confirmData: ConfirmData;

  constructor(message?: string, btnYes?: string, btnCancel?: string) {
    super();
    this.size = 'sm';
    this.confirmData = new ConfirmData();

    if (message) {
      this.confirmData.message = message;
    }
    if (btnYes) {
      this.confirmData.btnYes = btnYes;
    }
    if (btnCancel) {
      this.confirmData.btnCancel = btnCancel;
    }
  }
}
