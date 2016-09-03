import { Component, Input } from '@angular/core';


import { Area } from '../../shared/models';
import { AreaService, DialogService, FolderService } from '../../shared/services';
import { AnalyticsService } from "../../shared/services/analytics.service";


@Component({
  selector: 'area',
  styles: [require('./area.component.scss')],
  template: require('./area.component.pug')(),
})
export class AreaComponent {

  @Input() areaData: Area;
  @Input() isHovered: boolean;

  @Input() scaleWidth: number = 1;
  @Input() scaleHeight: number = 1;

  constructor(private folderService: FolderService,
              private ga: AnalyticsService,
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
