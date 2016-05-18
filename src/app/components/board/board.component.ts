import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Routes } from '@angular/router';

import { AreaComponent } from '../area';
import { BoardSettings, Area, ComponentData, NewArea } from '../../models';

@Component({
  selector: 'board',
  styles: [ require('./board.component.scss') ],
  template: require('./board.component.jade')(),
  directives: [
    AreaComponent
  ]
})
export class BoardComponent {

  @Input() components: ComponentData[];
  @Input() hoveredComponent: ComponentData[];

  @Output() areaCreate: EventEmitter<Area> = new EventEmitter<Area>();
  @Output() componentHover: EventEmitter<ComponentData> = new EventEmitter<ComponentData>();

  settings: BoardSettings = new BoardSettings()

  private newArea: NewArea = null;

  constructor() {
    this.settings.zoom = 100;
  }

  zoomPercent() {
    return `${this.settings.zoom}%`;
  }

  onMouseDown(event) {
    this.newArea = new NewArea(event.layerX, event.layerY);

    return false;
  }

  onMouseMove(event) {
    if (this.inAreaCreation()) {
      this.newArea.setBottomRight(event.layerX, event.layerY);
    } else {
      const component = this.findComponent(event.layerX, event.layerY);
      this.hoverComponent(component);
    }

    return false;
  }

  onMouseUp(event) {
    if (this.newArea.isValid()) {
      this.areaCreate.emit(this.newArea);
    }

    this.newArea = null;

    return false;
  }

  inAreaCreation() {
    return this.newArea !== null;
  }

  private findComponent(x, y): ComponentData {
    // TODO: optimizing the search
    const component = (<any>this.components).find((cmp) => cmp.contains(x, y));
    return component;
  }

  private hoverComponent(component: ComponentData) {
    // TODO: hovering 'null' means unhover... refactoring is needed later!
    if (!component) {
      this.componentHover.emit(null);
    } else {
      this.componentHover.emit(component);
    }
  }

}
