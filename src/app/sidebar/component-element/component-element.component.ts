import { Component, Input } from '@angular/core';

import { Folder } from '../../shared/models';

@Component({
  selector: 'component-element',
  styles: [ require('./component-element.component.scss') ],
  template: require('./component-element.component.jade')()
})
export class ComponentElement {

  @Input() folder: Folder;

  constructor() {
  }

}
