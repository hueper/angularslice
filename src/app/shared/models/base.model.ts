import { Utils } from '../services';

export class BaseModel {
  public _id: string;
  public static entityType: string;

  constructor() {
    if (!this._id) {
      this._id = this.generateId();
    }
  }

  generateId() {
    return '' + Utils.generateId();
  }
}
