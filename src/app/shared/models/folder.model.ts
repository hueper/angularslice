import { BaseModel } from './base.model';

export class Folder extends BaseModel {
  constructor(
    public folderId: string,
    public name: string
  ) {
    super();
  }

}
