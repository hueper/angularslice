import { Utils } from '../services';

export class BasicModel {
  public id: number;

  constructor() {
    this.id = Utils.generateId();
  }
}