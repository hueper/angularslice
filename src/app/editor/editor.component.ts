import { Component } from '@angular/core';

import { BoardComponent } from '../board';
import { SidebarComponent } from '../sidebar';
import { Component as ComponentModel, Rectangle } from '../shared/models';

@Component({
  selector: 'editor',
  template: require('./editor.component.jade')(),
  styles: [ require('./editor.component.scss') ],
  directives: [
    BoardComponent,
    SidebarComponent
  ]
})
export class EditorComponent {
  components: ComponentModel[] = [];
  hoveredComponent: ComponentModel = null;

  private componentCounter: number = 0;

  constructor() {
  }

  onAreaCreate(area: Rectangle) {
    const cmp = new ComponentModel(this.createComponentName(), area);
    this.components.push(cmp);
  }

  onComponentHover(component: ComponentModel) {
    this.hoveredComponent = component;
  }

  private createComponentName() {
    this.componentCounter++;
    return `component_${this.componentCounter}`;
  }
}
