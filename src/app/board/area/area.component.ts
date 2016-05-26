import { Component, Input } from '@angular/core';

import { Rectangle } from '../../shared/models';

@Component({
  selector: 'area',
  styles: [ require('./area.component.scss') ],
  template: require('./area.component.jade')()
})
export class AreaComponent {

  @Input() areaData: Rectangle;
  @Input() isHovered: boolean;

  constructor() {
  }

  getRectangle() {
    return {
      left: `${this.areaData.left}px`,
      top: `${this.areaData.top}px`,
      width: `${this.areaData.getWidth()}px`,
      height: `${this.areaData.getHeight()}px`
    };
  }

}
