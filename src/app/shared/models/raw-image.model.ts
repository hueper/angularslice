import { BaseModel } from './base.model';

export class RawImage extends BaseModel {
  constructor(
    public binaryData: any,
    public extension: string,
    public width: number,
    public height: number
  ) {
    super();
  }
}
