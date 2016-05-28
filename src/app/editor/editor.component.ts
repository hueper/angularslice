import { Component } from '@angular/core';

import { BoardComponent } from '../board';
import { SidebarComponent } from '../sidebar';
import { Folder, Area } from '../shared/models';

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
  components: Folder[] = [];
  hoveredComponent: Folder = null;

  private componentCounter: number = 0;

  constructor() {
  }

  onAreaCreate(area: Area) {
    const cmp = new Folder(null, this.createComponentName());
    this.components.push(cmp);
  }

  onComponentHover(component: Folder) {
    this.hoveredComponent = component;
  }

  private createComponentName() {
    this.componentCounter++;
    return `component_${this.componentCounter}`;
  }
}
