import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
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

  settings: BoardSettings = new BoardSettings();
  
  imageSrc: string = 'http://img.prntscr.com/img?url=http://i.imgur.com/jRMDo6h.png';
  
  private newArea: NewArea = null;

  constructor() {
    this.settings.zoom = 100;
  }

  previewFile(event) {
    var file    = event.srcElement.files[0];
    var reader  = new FileReader();

    reader.addEventListener('load', (e:any) => {
      this.imageSrc = e.currentTarget.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
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
      this.newArea.invalid = ! this.isValidArea(this.newArea);
      this.newArea.setBottomRight(event.layerX, event.layerY);
    } else {
      const component = this.findComponent(event.layerX, event.layerY);
      this.hoverComponent(component);
    }

    return false;
  }

  onMouseUp(area) {
    if (this.isValidArea(this.newArea)) {
      this.areaCreate.emit(this.newArea);
    }

    this.newArea = null;

    return false;
  }

  inAreaCreation() {
    return this.newArea !== null;
  }

  private isValidArea(area: Area): boolean {
    return area.hasDimensions() && ! this.isCrossingOther(area);
  }

  private isCrossingOther(area: Area): boolean {
    return !!(<any>this.components).find((cmp) => cmp.isCrossing(area));
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
