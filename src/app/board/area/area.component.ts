import { Component, Input } from '@angular/core';
import { MD_ICON_DIRECTIVES } from "@angular2-material/icon"
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';

import { Area } from '../../shared/models';
import { AreaService, DialogService, FolderService } from '../../shared/services';


@Component({
  selector: 'area',
  styles: [require('./area.component.scss')],
  template: require('./area.component.jade')(),
  directives: [MD_ICON_DIRECTIVES]
})
export class AreaComponent {

  @Input() areaData: Area;
  @Input() isHovered: boolean;

  @Input() scaleWidth: number = 1;
  @Input() scaleHeight: number = 1;

  constructor(private folderService: FolderService,
              private ga: Angulartics2GoogleAnalytics,
              private dialogService: DialogService,
              private areaService: AreaService) {

  }

  goToComponent() {
    this.ga.eventTrack('navigateByArea', { category: 'manually' });
    this.folderService.setCurrentById(this.areaData.folderId);
  }

  deleteArea() {
    this.ga.eventTrack('deleteArea', { category: 'manually' });

    // Confirm Dialog
    this.dialogService.openConfirmDialog().then((result) => {
      if (result) {
        // let folder = this.areaService.findById(this.areaData.folderId);
        this.areaService.delete(this.areaData);
      }
    });
  }

  getRectangle() {
    let values = {
      left: `${this.areaData.left * this.scaleWidth}px`,
      top: `${this.areaData.top * this.scaleHeight}px`,
      width: `${this.areaData.getWidth() * this.scaleWidth}px`,
      height: `${this.areaData.getHeight() * this.scaleHeight}px`
    };
    return values;
  }

}
