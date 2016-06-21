import { BaseModel } from './base.model';

export class RawImage extends BaseModel {
  constructor(
    public _id: string,
    public binaryData: string,
    public width: number,
    public height: number,
    public name: string
  ) {
    super();
  }
}
