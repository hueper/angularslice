import { Injectable} from '@angular/core';

import { BaseService } from './base.service';
import { Area } from '../models';

@Injectable()
export class AreaService extends BaseService<Area> {
  constructor() {
    super();
  }
}