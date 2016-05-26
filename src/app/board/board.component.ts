import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Routes } from '@angular/router';

import { AreaComponent } from './area';
import { Settings, Rectangle, RawImage, Component as ComponentModel, NewArea } from '../shared/models';

@Component({
  selector: 'board',
  styles: [ require('./board.component.scss') ],
  template: require('./board.component.jade')(),
  directives: [
    AreaComponent
  ]
})
export class BoardComponent {

  @Input() components: ComponentModel[];
  @Input() hoveredComponent: ComponentModel[];

  @Output() areaCreate: EventEmitter<Rectangle> = new EventEmitter<Rectangle>();
  @Output() componentHover: EventEmitter<ComponentModel> = new EventEmitter<ComponentModel>();

  settings: Settings = new Settings();
  
  imageSrc: string = 'http://assets.snappages.com/main/images/flat_website.png';
  areaStyle: any = {};

  private newArea: NewArea = null;

  constructor() {
    this.settings.zoom = 100;
  }

  previewFile(event) {
    var file    = event.srcElement.files[0];
    let rawImage = new RawImage(file);
  }

  zoomPercent() {
    return `${this.settings.zoom}%`;
  }

  onMouseDown(event) {
    this.newArea = new NewArea(event.layerX, event.layerY);
    this.areaStyle['pointer-events'] = 'none';

    return false;
  }

  onMouseMove(event) {
    if (this.inAreaCreation()) {
      this.newArea.setDiagonalCoordinates(event.layerX, event.layerY);
      this.newArea.invalid = !this.isValidArea(this.newArea);
    } else {
      const component = this.findComponent(event.layerX, event.layerY);
      this.hoverComponent(component);
    }

    return false;
  }

  // isOverLapped(newArea) {
  //   var overLappedComponents = this.components.filter((cmp) => {
  //     return cmp.top < newArea.bottom
  //       || cmp.bottom > newArea.top
  //       || cmp.right < newArea.left
  //       || cmp.left > newArea.right;
  //   });
  //
  //   return overLappedComponents.length > 0;
  // }

  onMouseUp(area) {
    if (this.isValidArea(this.newArea)) {
      this.areaCreate.emit(this.newArea);
    }

    this.newArea = null;
    this.areaStyle = {};

    return false;
  }

  inAreaCreation() {
    return this.newArea !== null;
  }

  private isValidArea(area: Rectangle): boolean {
    return !this.isCrossingOther(area);
  }

  private isCrossingOther(area: Rectangle): boolean {
    return !!(<any>this.components).find((cmp) => cmp.overLaps(area));
  }

  private findComponent(x, y): ComponentModel {
    // TODO: optimizing the search
    const component = (<any>this.components).find((cmp) => cmp.contains(x, y));
    return component;
  }

  private hoverComponent(component: ComponentModel) {
    // TODO: hovering 'null' means unhover... refactoring is needed later!
    if (!component) {
      this.componentHover.emit(null);
    } else {
      this.componentHover.emit(component);
    }
  }

}
