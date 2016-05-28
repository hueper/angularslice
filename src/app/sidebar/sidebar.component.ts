import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ComponentElement } from './component-element';
import { Folder } from '../shared/models';

@Component({
  selector: 'sidebar',
  styles: [ require('./sidebar.component.scss') ],
  template: require('./sidebar.component.jade')(),
  directives: [
    ComponentElement
  ]
})
export class SidebarComponent {

  @Input() components: Folder[];
  @Input() hoveredComponent: Folder;

  @Output() componentHover: EventEmitter<Folder> = new EventEmitter<Folder>();

  constructor() {
  }

  onMouseOver($event) {
    this.componentHover.emit($event);
  }

}
