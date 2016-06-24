import { Component } from '@angular/core';
import { ModalComponent, DialogRef } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { MdButton } from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";

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

  constructor(public dialog: DialogRef<BSModalContext>,
              private userService: UserService) {

  }

  send() {
    // humane.log('Component name is missing', { timeout: 4000, clickToClose: true });

    this.dialog.close(this.componentData.repoName);
  }

  githubAuth() {
    const authUrl = 'http://192.168.1.102:3000/auth/github';
    const _oauthWindow = window.open(authUrl, 'GitHub Auth', 'width=800,height=600');

    _oauthWindow.addEventListener('unload', () => {
      this.userService.pollUser().subscribe(res => {
        let user = res.data as User;
        let accessToken = _.get(user, 'oauthData.github.accessToken', false);

        if (accessToken) {
          this.close(true, user);
          //TODO: the user authentication was successfull, we can do whatever we want ;)
        } else {
          console.log("accessToken => ", user);
          Humane.log(`Sorry, we couldn't authenticate you. Please try again.`, { addnCls: 'humane-error' });

        }
      });
      _oauthWindow.removeEventListener('unload');
    });
  }

  close(success: boolean, user: User) {
    this.dialog.dismiss({
      success: success,
      user: user
    });
  }
}
