import * as _ from "lodash";
import { Component, ElementRef, OnDestroy } from "@angular/core";
import { ModalComponent, DialogRef } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { MdButton } from "@angular2-material/button";
import { MdInput } from "@angular2-material/input";
import { MdCheckbox } from "@angular2-material/checkbox";
import { MdRadioButton, MdRadioGroup, MdRadioDispatcher } from "@angular2-material/radio";
import { Subscription } from "rxjs";
const Humane = require('humane-js');

import { Folder } from "../../shared/models";
import { FolderService } from "../../shared/services";

@Component({
  selector: 'export-dialog',
  template: require('./export-dialog.jade')(),
  styles: [require('./export-dialog.component.scss')],
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
export class ExportDialogComponent implements ModalComponent<BSModalContext> {
  protected activeSelect: string;

  constructor(public dialog: DialogRef<BSModalContext>) {

  }

  noop(type: string, $event) {
    this.dialog.close(type);
  }

  close() {
    this.dialog.dismiss();
  }
}
