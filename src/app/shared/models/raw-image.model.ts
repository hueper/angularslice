import { BaseModel } from './base.model';

export class RawImage extends BaseModel {
  constructor(
    public binaryData: string,
    public width: number,
    public height: number
  ) {
    super();
  }
}