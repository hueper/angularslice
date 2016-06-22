import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { FolderService } from './folder.service';
import { Area } from '../models';

@Injectable()
export class AreaService extends BaseService<Area> {
  constructor(
    private folderService:FolderService
  ) {
    super('areas', Area);

    this.folderService.deleteSource.subscribe(folder => {
      this.find({ folderId: folder._id }).map( (area) => {
        this.delete(area);
      });
    });
  }

}
