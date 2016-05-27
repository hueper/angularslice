import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { AreaComponent } from './area';
import { Image, Settings, Rectangle, RawImage, Component as ComponentModel, NewArea } from '../shared/models';
import { RawImageService, ImageService } from '../shared/services';

@Component({
  selector: 'board',
  styles: [ require('./board.component.scss') ],
  template: require('./board.component.jade')(),
  providers: [RawImageService, ImageService],
  directives: [
    AreaComponent
  ]
})
export class BoardComponent {

  @Input() components: ComponentModel[];
  @Input() hoveredComponent: ComponentModel[];

  @Output() areaCreate: EventEmitter<Rectangle> = new EventEmitter<Rectangle>();
  @Output() componentHover: EventEmitter<ComponentModel> = new EventEmitter<ComponentModel>();

  currentImage: Image = null;
  areaStyle: any = {};
  imageContainerStyle: any = { 'width': '0', 'height': '0', 'background-image': 'url()' };

  private newArea: NewArea = null;

  constructor(
    public rawImageService: RawImageService,
    public imageService: ImageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // Look for new images without filtering
    this.imageService.imagesSource.subscribe((data) => {
      if (!data.length) return;
      this.currentImage = data[0];

      // this.imageContainerStyle['display'] = 'initial';
      this.imageContainerStyle['width'] = this.currentImage.width + 'px';
      this.imageContainerStyle['height'] = this.currentImage.height + 'px';
      this.imageContainerStyle['background-image'] = 'url(' + this.rawImageService.findOne({ id: this.currentImage.rawImageId }).binaryData + ')',

      this.changeDetectorRef.detectChanges();
      console.log('was triggered', data, this.imageContainerStyle);
    });
  }

  loadFile(event) {
    var file  = event.srcElement.files[0];
    this.rawImageService.createFromFile(file);
  }

  onMouseLeave(event) {
    // TODO: create the snap effect
    console.log(event);
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
