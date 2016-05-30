import { Component } from '@angular/core';

import { BoardComponent } from '../board';
import { SidebarComponent } from '../sidebar';

@Component({
  selector: 'editor.c-editor',
  template: require('./editor.component.jade')(),
  styles: [ require('./editor.component.scss') ],
  directives: [
    BoardComponent,
    SidebarComponent
  ]
})
export class EditorComponent {

  constructor() {}

}
