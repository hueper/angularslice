import {Component} from "@angular/core";

import {BoardComponent} from "../board";
import {SidebarComponent} from "../sidebar";
import {ToolbarComponent} from '../toolbar';

@Component({
  selector: 'editor.c-editor',
  template: require('./editor.component.jade')(),
  styles: [ require('./editor.component.scss') ],
  directives: [
    BoardComponent,
    SidebarComponent,
    ToolbarComponent
  ]
})
export class EditorComponent {

  constructor() {}

}
