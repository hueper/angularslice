import { BaseModel } from './base.model';
import { Utils } from '../services';

export class RawImage extends BaseModel {
  constructor(
    public _id: string,
    public url: string,
    public width: number,
    public height: number,
    public name: string = 'image' + Utils.generateId()
  ) {
    super();
  }


}
