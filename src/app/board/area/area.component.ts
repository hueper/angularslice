import { Component, Input } from '@angular/core';

import { Area } from '../../shared/models';
import { AreaService, DialogService, FolderService } from '../../shared/services';
import { MD_ICON_DIRECTIVES } from "@angular2-material/icon"


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
    private folderService: FolderService,
    private dialogService: DialogService,
    private areaService: AreaService
  ) {

  }

  goToComponent() {
    this.folderService.setCurrentById(this.areaData.folderId);
  }

  deleteArea() {
    // Confirm Dialog
    this.dialogService.openConfirmDialog().then((result) => {
      if (result) {
        // let folder = this.areaService.findById(this.areaData.folderId);
        this.areaService.delete(this.areaData);
      }
    });
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
