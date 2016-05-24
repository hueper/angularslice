import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { BoardComponent } from '../board';
import { SidebarComponent } from '../sidebar';
import { Component as ComponentModel, Area } from '../../models';

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
  components: ComponentModel[] = [];
  hoveredComponent: ComponentModel = null;

  private componentCounter: number = 0;

  constructor() {
  }

  onAreaCreate(area: Area) {
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
