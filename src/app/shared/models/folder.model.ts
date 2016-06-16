import { BaseModel } from './base.model';

export class Folder extends BaseModel {
  constructor(
    public folderId: number,
    public name: string
  ) {
    super();
  }

}