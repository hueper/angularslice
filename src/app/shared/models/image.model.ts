import { Rectangle } from './area.model';
import { BasicModel } from './basic-model.model';

export class Image extends BasicModel {
  public id: number;
  public rawImageId: number;
  public name: string;
  public areas: Rectangle[];

  // To show just parts of the image
  public x: number = 0;
  public y: number = 0;
  public width: number;
  public height: number;

  constructor() {
    super();
  }
}