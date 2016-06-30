import * as _ from "lodash";
import { Component } from "@angular/core";
import { ModalComponent, DialogRef } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { MdButton } from "@angular2-material/button";
import { MdInput } from "@angular2-material/input";
import { MdCheckbox } from "@angular2-material/checkbox";
import { MdRadioButton, MdRadioGroup, MdRadioDispatcher } from "@angular2-material/radio";
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from "@angular2-material/progress-circle/progress-circle";

const Humane = require('humane-js');

import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { AnalyticsService } from "../../shared/services/analytics.service";

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
    MD_PROGRESS_CIRCLE_DIRECTIVES
  ],
  providers: [
    MdRadioDispatcher,
  ]
})
export class ExportDialogComponent implements ModalComponent<BSModalContext> {
  protected activeSelect: string;
  protected loading: boolean = false;

  constructor(public dialog: DialogRef<BSModalContext>,
              private ga: AnalyticsService,
              private userService: UserService) {
  }

  noop(type: string, $event) {
    this.ga.eventTrack('exportProject', { category: type });
    this.dialog.close(type);
  }


  githubAuth() {
    this.ga.eventTrack('exportProject', { category: 'github' });
    this.loading = true;
    const authUrl = '/auth/github';
    let _oauthWindow = window.open(authUrl, 'GitHub Auth', 'width=800,height=600,top=0,left=0');
    let interval = setInterval(() => {
      if (_oauthWindow.closed) {
        clearInterval(interval);
        this.windowClosed();
      }
    }, 500);
  }

  windowClosed() {
    this.userService.pollUser().subscribe(res => {
      let user = res.data as User;
      let accessToken = _.get(user, 'oauthData.github.accessToken', false);

      if (accessToken) {
        this.dialog.close('github');
        //TODO: the user authentication was successfull, we can do whatever we want ;)
      } else {
        this.loading = false;
        Humane.log(`Sorry, we couldn't authenticate you. Please try again.`, { addnCls: 'humane-error' });
        this.close();
      }
    });
  }

  close() {
    this.dialog.dismiss();
  }
}
