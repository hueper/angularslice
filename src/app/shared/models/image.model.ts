import { BaseModel } from './base.model';

export class Image extends BaseModel {
  constructor(
    public folderId: number,
    public rawImageId: number,
    public name: string,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super();
  }

  setFolderId(id) {
    this.folderId = id;
  }

  setDimension(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
