import { Component, Input } from '@angular/core';

import { Component as ComponentModel } from '../../models';

@Component({
  selector: 'component-element',
  styles: [ require('./component-element.component.scss') ],
  template: require('./component-element.component.jade')()
})
export class ComponentElement {

  @Input() component: ComponentModel;
  @Input() isHovered: boolean;

  constructor() {
  }

}
