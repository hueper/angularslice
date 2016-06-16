import { Component, Input } from '@angular/core';

import { Area } from '../../shared/models';
import { FolderService } from '../../shared/services';
import {MD_ICON_DIRECTIVES} from "@angular2-material/icon"


@Component({
  selector: 'area',
  styles: [ require('./area.component.scss') ],
  template: require('./area.component.jade')(),
  directives: [MD_ICON_DIRECTIVES]
})
export class AreaComponent {

  @Input() areaData: Area;
  @Input() isHovered: boolean;

  constructor(
    private folderService: FolderService
  ) {

  }

  goToComponent() {
    this.folderService.setCurrentById(this.areaData.folderId);
  }

  deleteArea() {
    let folder = this.folderService.findById(this.areaData.folderId);
    this.folderService.delete(folder);
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
