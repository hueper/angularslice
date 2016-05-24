import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ComponentElement } from '../component-element';
import { Component as ComponentModel } from '../../models';

@Component({
  selector: 'sidebar',
  styles: [ require('./sidebar.component.scss') ],
  template: require('./sidebar.component.jade')(),
  directives: [
    ComponentElement
  ]
})
export class SidebarComponent {

  @Input() components: ComponentModel[];
  @Input() hoveredComponent: ComponentModel;

  @Output() componentHover: EventEmitter<ComponentModel> = new EventEmitter<ComponentModel>();

  constructor() {
  }

  onMouseOver($event) {
    this.componentHover.emit($event);
  }

}
