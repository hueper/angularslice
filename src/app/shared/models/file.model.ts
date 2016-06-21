import { BaseModel } from './base.model';

export class File extends BaseModel {
  constructor(
    public folderId: string,
    public templateId: string,
    public name: string
  ) {
    super();
  }

}
