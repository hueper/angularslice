import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class TooltipOptions {
  public placement:string;
  public popupClass:string;
  public animation:boolean;
  public isOpen:boolean;
  public appendToBody: boolean;
  public followCursor: boolean;
  
  public constructor(options:Object) {
    _.assign(this, options);
  }
}
