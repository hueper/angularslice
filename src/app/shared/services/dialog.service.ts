import {Injectable} from "@angular/core";
import {Modal, BSModalContext} from "angular2-modal/plugins/bootstrap";
import {ComponentDialog} from "../../component_dialog/component_dialog.component";
import {EditComponentDialog, EditComponentDialogData} from "../../component-edit_dialog/component-edit_dialog.component";
import {ConfirmDialog, ConfirmDialogData} from "../../confirm_dialog/confirm_dialog.component";

@Injectable()
export class DialogService {

  constructor(private modal:Modal) {

  }

  openCreateComponentDialog() {
    const data = new BSModalContext();
    return this.modal
      .open(ComponentDialog, data)
      .then(dialog => {
        return dialog.result;
      });
  }

  openEditComponentDialog(folder) {
    const data = new EditComponentDialogData(folder);
    return this.modal
      .open(EditComponentDialog, data)
      .then(dialog => {
        return dialog.result;
      });
  }

  openConfirmDialog() {
    const data = new ConfirmDialogData();
    return this.modal
      .open(ConfirmDialog, data)
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
