import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { AreaComponent } from './area';
import { ImageBarComponent } from './image-bar';
import { Image, Area, RawImage, Folder, NewArea } from '../shared/models';
import { RawImageService, ImageService } from '../shared/services';

@Component({
  selector: 'board',
  styles: [ require('./board.component.scss') ],
  template: require('./board.component.jade')(),
  providers: [RawImageService, ImageService],
  directives: [
    AreaComponent,
    ImageBarComponent,
  ]
})
export class BoardComponent {

  @Input() components: Folder[];
  @Input() hoveredComponent: Folder[];

  @Output() areaCreate: EventEmitter<Area> = new EventEmitter<Area>();
  @Output() componentHover: EventEmitter<Folder> = new EventEmitter<Folder>();

  currentImage: Image = null;
  areaStyle: any = {};
  imageContainerStyle: any = { 'width': '0', 'height': '0', 'background-image': 'url()', 'background-size': 'contain' };

  private newArea: NewArea = null;

  constructor(
    public rawImageService: RawImageService,
    public imageService: ImageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    // Look for new images without filtering
    this.imageService.dataSource.subscribe((data: Image[]) => {
      if (!data.length) return;
      this.currentImage = data[0];

      // this.imageContainerStyle['display'] = 'initial';
      this.imageContainerStyle['width'] = this.currentImage.width + 'px';
      this.imageContainerStyle['height'] = this.currentImage.height + 'px';
      this.imageContainerStyle['background-image'] = 'url(' + this.imageService.getBinaryData(this.currentImage) + ')',

      this.changeDetectorRef.detectChanges();
    });

    setTimeout(() => {
      // For testing, some init images
      let img0 = 'http://s33.postimg.org/aqd0rerum/page1.jpg';
      let img1 = 'http://s33.postimg.org/53ufz5tha/page2.jpg';
      let img2 = 'http://s33.postimg.org/gu8dgjm9q/page3.jpg';
      let img3 = 'http://s33.postimg.org/kdp998iny/page4.jpg';

      this.rawImageService.create(new RawImage(img0, 700, 800));
      this.rawImageService.create(new RawImage(img1, 700, 800));
      this.rawImageService.create(new RawImage(img2, 700, 800));
      this.rawImageService.create(new RawImage(img3, 700, 800));

    }, 500);
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

  private isValidArea(area: Area): boolean {
    return !this.isCrossingOther(area);
  }

  private isCrossingOther(area: Area): boolean {
    return !!(<any>this.components).find((cmp) => cmp.overLaps(area));
  }

  private findComponent(x, y): Folder {
    // TODO: optimizing the search
    const component = (<any>this.components).find((cmp) => cmp.contains(x, y));
    return component;
  }

  private hoverComponent(component: Folder) {
    // TODO: hovering 'null' means unhover... refactoring is needed later!
    if (!component) {
      this.componentHover.emit(null);
    } else {
      this.componentHover.emit(component);
    }
  }

}
