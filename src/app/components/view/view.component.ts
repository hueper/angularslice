import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { BoardComponent } from '../board';
import { SidebarComponent } from '../sidebar';
import { ComponentData, Area } from '../../models';

@Component({
  selector: 'view',
  template: require('./view.component.jade')(),
  styles: [ require('./view.component.scss') ],
  directives: [
    BoardComponent,
    SidebarComponent
  ]
})
export class ViewComponent {
  components: ComponentData[] = [];
  hoveredComponent: ComponentData = null;

  private componentCounter: number = 0;

  constructor() {
  }

  onAreaCreate(area: Area) {
    const cmp = new ComponentData(this.createComponentName(), area);
    this.components.push(cmp);
  }

  onComponentHover(component: ComponentData) {
    this.hoveredComponent = component;
  }

  private createComponentName() {
    this.componentCounter++;
    return `component_${this.componentCounter}`;
  }
}
