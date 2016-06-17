import { Component } from "@angular/core";
import { ModalComponent, DialogRef } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { MdButton } from "@angular2-material/button";
import { MdInput } from "@angular2-material/input";
import { Folder } from "../shared/models";

export class EditComponentDialogDataComponent extends BSModalContext {
  public component: Folder;

  constructor(folder?: Folder) {
    super();
    this.size = 'lg';
    this.component = folder;
  }
}

@Component({
  selector: 'component-dialog',
  template: require('./component-edit_dialog.jade')(),
  styles: [require('./component-edit_dialog.component.scss')],
  directives: [
    MdButton,
    MdInput,
  ],
  providers: []
})
export class EditComponentDialogComponent implements ModalComponent<EditComponentDialogDataComponent> {
  private context: EditComponentDialogDataComponent;
  private componentData: Folder;


  constructor(
    public dialog: DialogRef<EditComponentDialogDataComponent>
  ) {
    this.context = dialog.context;
    this.componentData = this.context.component;
  }

  send() {
    let result = {
      action: 'save',
      data: this.componentData
    };
    this.dialog.close(result);
  }

  delete() {
    let result = {
      action: 'delete',
      data: this.componentData
    };
    this.dialog.close(result);
  }

  close() {
    this.dialog.dismiss();
  }
}
