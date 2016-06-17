import * as _ from "lodash";
import { Component, OnDestroy } from '@angular/core';
import { ModalComponent, DialogRef } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ConfirmData } from '../shared/models';
import { MdButton } from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { Subscription } from 'rxjs';

export class ConfirmDialogDataComponent extends BSModalContext {
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
@Component({
  selector: 'confirm-dialog',
  template: require('./confirm_dialog.jade')(),
  styles: [require('./confirm_dialog.component.scss')],
  directives: [
    MdButton,
    MdIcon
  ],
  providers: [
    MdIconRegistry,
  ]
})
export class ConfirmDialogComponent implements ModalComponent<ConfirmDialogDataComponent>, OnDestroy {
  private subscriptions: Subscription[] = [];
  private context: ConfirmDialogDataComponent;
  private confirmData: ConfirmData;

  constructor(
    public dialog: DialogRef<ConfirmDialogDataComponent>
  ) {
    this.context = dialog.context;
    this.confirmData = this.context.confirmData;
    console.log(this.confirmData);
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
