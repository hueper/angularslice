import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ComponentElement } from '../component-element';
import { ComponentData } from '../../models';

@Component({
  selector: 'sidebar',
  styles: [ require('./sidebar.component.scss') ],
  template: require('./sidebar.component.jade')(),
  directives: [
    ComponentElement
  ]
})
export class SidebarComponent {

  @Input() components: ComponentData[];
  @Input() hoveredComponent: ComponentData;

  @Output() componentHover: EventEmitter<ComponentData> = new EventEmitter<ComponentData>();

  constructor() {
  }

  onMouseOver($event) {
    this.componentHover.emit($event);
  }

}
