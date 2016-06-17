import { Injectable } from "@angular/core";
import { Modal, BSModalContext } from "angular2-modal/plugins/bootstrap";
import { ComponentDialogComponent } from "../../component_dialog/component_dialog.component";
import { EditComponentDialogComponent, EditComponentDialogDataComponent } from "../../component-edit_dialog/component-edit_dialog.component";
import { ConfirmDialogComponent, ConfirmDialogDataComponent } from "../../confirm_dialog/confirm_dialog.component";

@Injectable()
export class DialogService {

  constructor(private modal:Modal) {

  }

  openCreateComponentDialog() {
    const data = new BSModalContext();
    return this.modal
      .open(ComponentDialogComponent, data)
      .then(dialog => {
        return dialog.result;
      });
  }

  openEditComponentDialog(folder) {
    const data = new EditComponentDialogDataComponent(folder);
    return this.modal
      .open(EditComponentDialogComponent, data)
      .then(dialog => {
        return dialog.result;
      });
  }

  openConfirmDialog() {
    const data = new ConfirmDialogDataComponent();
    return this.modal
      .open(ConfirmDialogComponent, data)
      .then(dialog => {
        return dialog.result;
      })
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
