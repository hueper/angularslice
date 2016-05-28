import { BaseModel } from './base.model';

export class File extends BaseModel {
  constructor(
    public folderId: number,
    public templateId: number,
    public name: string
  ) {
    super();
  }

}