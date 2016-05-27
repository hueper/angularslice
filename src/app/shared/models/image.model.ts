import { BasicModel } from './basic-model.model';

export class Image extends BasicModel {
  public id: number;

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