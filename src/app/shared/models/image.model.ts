import { BaseModel } from './base.model';

export class Image extends BaseModel {
  constructor(
    public rawImageId: number,
    public name: string,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super();
  }

}