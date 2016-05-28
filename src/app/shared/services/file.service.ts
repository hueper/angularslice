import { Injectable} from '@angular/core';

import { BaseService } from './base.service';
import { File } from '../models';

@Injectable()
export class FileService extends BaseService<File> {
  constructor() {
    super();
  }
  
  
}