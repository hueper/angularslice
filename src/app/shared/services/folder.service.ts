import { Injectable} from '@angular/core';

import { BaseService } from './base.service';
import { Folder } from '../models';

@Injectable()
export class FolderService extends BaseService<Folder> {
  constructor() {
    super();

    this.create(new Folder(null, 'folder1'));
    this.create(new Folder(null, 'folder2'));
    this.create(new Folder(null, 'folder3'));
  }
}