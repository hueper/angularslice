import { Component } from "@angular/core";
import { ModalComponent, DialogRef } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";

const Humane = require('humane-js');

import { UserService } from "../../shared/services/user.service";
import { AnalyticsService } from "../../shared/services/analytics.service";
import Timer = NodeJS.Timer;

@Component({
  selector: 'export-dialog',
  template: require('./export-dialog.pug')(),
  styles: [require('./export-dialog.component.scss')],
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
    let interval: Timer = setInterval(() => {
      if (_oauthWindow.closed) {
        clearInterval(interval);
        this.windowClosed();
      }
    }, 500);
  }

  windowClosed() {
    // this.userService.pollUser().subscribe(res => {
    //   let user = res.data as User;
    //   let accessToken = _.get(user, 'oauthData.github.accessToken', false);
    //
    //   if (accessToken) {
    //     this.dialog.close('github');
    //     //TODO: the user authentication was successfull, we can do whatever we want ;)
    //   } else {
    //     this.loading = false;
    //     Humane.log(`Sorry, we couldn't authenticate you. Please try again.`, { addnCls: 'humane-error' });
    //     this.close();
    //   }
    // });
  }

  close() {
    this.dialog.dismiss();
  }
}
