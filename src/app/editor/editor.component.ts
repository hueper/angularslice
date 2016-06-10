import {Component} from "@angular/core";

import {MD_ICON_DIRECTIVES} from '@angular2-material/icon';

import {BoardComponent} from "../board";
import {SidebarComponent} from "../sidebar";
import {ToolbarComponent} from "../toolbar";


@Component({
  selector: 'editor.c-editor',
  template: require('./editor.component.jade')(),
  styles: [ require('./editor.component.scss') ],
  directives: [
    BoardComponent,
    SidebarComponent,
    ToolbarComponent,
    MD_ICON_DIRECTIVES
  ]
})
export class EditorComponent {
  logo:any;

  constructor() {
    this.logo = require('../shared/assets/img/angular.svg');
  }
}
