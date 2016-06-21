import { Utils } from '../services';

export class BaseModel {
  public _id: string;

  constructor() {
    this._id = '' + Utils.generateId();
  }
}
