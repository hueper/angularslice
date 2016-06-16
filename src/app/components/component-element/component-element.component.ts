import { Component, Input } from '@angular/core';

import { ComponentData } from '../../models';

@Component({
  selector: 'component-element',
  styles: [ require('./component-element.component.scss') ],
  template: require('./component-element.component.jade')()
})
export class ComponentElement {

  @Input() component: ComponentData;
  @Input() isHovered: boolean;

  constructor() {
  }

}
