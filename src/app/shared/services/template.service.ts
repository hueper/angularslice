import { Injectable} from '@angular/core';

import { BaseService } from './base.service';
import { Template } from '../models';

@Injectable()
export class TemplateService extends BaseService<Template> {
  constructor() {
    super();
  }
}