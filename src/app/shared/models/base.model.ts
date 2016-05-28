import { Utils } from '../services';

export class BaseModel {
  public id: number;

  constructor() {
    this.id = Utils.generateId();
  }
}