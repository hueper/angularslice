import { Component } from '@angular/core';
import { ModalComponent, DialogRef } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { MdButton } from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';

const Humane = require('humane-js');

@Component({
  selector: 'github-dialog',
  template: require('./github-dialog.jade')(),
  styles: [require('./github-dialog.component.scss')],
  directives: [
    MdButton,
    MdInput,
  ],
  providers: []
})
export class GithubDialogComponent implements ModalComponent<BSModalContext> {
  componentData: any = {
    repoName: null
  };

  constructor(public dialog: DialogRef<BSModalContext>) {
  }

  eventHandler(event) {
    if (event.which === 13) {
      this.send();
      event.preventDefault();
      return false;
    }
  }

  send() {

    if (this.componentData.repoName) {
      this.dialog.close(this.componentData.repoName);
    } else {
      humane.log('Component name is missing', { timeout: 4000, clickToClose: true });
    }
  }

  close() {
    this.dialog.dismiss();
  }
}
