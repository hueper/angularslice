import { BaseModel } from './base.model';

export class Template extends BaseModel {
  constructor(
    public extension: string,
    public content: string
  ) {
    super();
  }

}