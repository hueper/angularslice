import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Folder } from "../models";

@Injectable()
export class FolderService extends BaseService<Folder> {

  constructor() {
    super('folders', Folder);

    // Just create if not read from cache..
    const rootFolder = this.findOne({ folderId: null });
    if (!rootFolder) {
      this.create(new Folder(null, 'app'));
    }

    this.deleteSource.subscribe(folder => {
      this.find({ folderId: folder._id }).map((children) => {
        this.delete(children);
      });
    });
  }
}
