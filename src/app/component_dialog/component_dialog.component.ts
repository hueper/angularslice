import * as _ from "lodash";
import { Component, OnDestroy } from "@angular/core";
import { ModalComponent, DialogRef } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { MdButton } from "@angular2-material/button";
import { MdInput } from "@angular2-material/input";
import { MdCheckbox } from "@angular2-material/checkbox";
import { MdRadioButton, MdRadioGroup, MdRadioDispatcher } from "@angular2-material/radio";
import { Folder } from "../shared/models";
import { FolderService } from "../shared/services";
import { Subscription } from "rxjs";

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
  ],
  providers: [
    MdRadioDispatcher,
  ]
})
export class ComponentDialogComponent implements ModalComponent<BSModalContext>, OnDestroy {
  component: any;
  public folders: Folder[];
  private subscriptions: Subscription[] = [];

  constructor(
    public dialog: DialogRef<BSModalContext>,
    private folderService: FolderService
  ) {
    this.subscriptions.push(folderService.dataSource.subscribe((folders: Folder[]) => {
      this.folders = folders;
    }));
    this.component = {
      type: 'new',
      attach: true,
      folder: null,
    }
  }

  ngOnDestroy() {
    _.each(this.subscriptions, subscription => {
      subscription.unsubscribe();
    });
  }

  changeAttachImage(event) {
    this.component.attach = event.checked;
  }

  send() {
    let result = {
      action: 'save',
      data: this.component
    };
    this.dialog.close(result);
  }

  close() {
    this.dialog.dismiss();
  }
}
