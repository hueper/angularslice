import { Injectable} from '@angular/core';

import { BaseService } from './base.service';
import { Folder } from '../models';

@Injectable()
export class FolderService extends BaseService<Folder> {
  constructor() {
    super();
  }
}