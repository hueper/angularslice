import { Area } from './area.model';

export class Image {
  public id: number;
  public rawImageId: number;
  public name: string;
  public areas: Area[];

  // To show just parts of the image
  public x: number = 0;
  public y: number = 0;
  public width: number;
  public height: number;

  constructor() {

  }
}