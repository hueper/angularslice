import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { Template } from '../models';

@Injectable()
export class TemplateService extends BaseService<Template> {
  constructor() {
    super();

    this.create(new Template('component.ts', `
import {Component} from '@angular/core';

@Component({
  selector: '{{name}}',
  template: require('./{{name}}.pug')(),
  styles: [ require('./{{name}}.scss') ],
  providers: [],
  pipes: [],
  directives: [],
})
export class {{properCase name}}Component {
  constructor() {
  }
}`))
    this.create(new Template('component.html', '<div class="{{name}}"></div>'));
    this.create(new Template('component.css', `.{{name}} {
  
}`));

  }
}
