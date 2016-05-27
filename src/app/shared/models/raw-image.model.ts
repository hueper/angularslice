import { BasicModel } from './basic-model.model';

export class RawImage extends BasicModel {
  public binaryData: string;
  public width: number;
  public height: number;

  constructor(binaryData: string, width: number, height: number) {
    super();

    this.binaryData = binaryData;
    this.width = width;
    this.height = height;
  }
}