import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Folder } from "../models";

@Injectable()
export class FolderService extends BaseService<Folder> {

  private dummyBoolean:boolean = true;

  constructor() {
    super('folders', Folder);

    // Just create if not read from cache..
    const rootFolder = this.findOne({ folderId: null });
    if (!rootFolder) {
      this.create(new Folder(null, 'app'));
    }


    // this.filter(f => f.folderId === null && this.dummyBoolean).subscribe(folders=> {
    //   this.dummyBoolean = false;
    //   if (folders.length > 0) {
    //     let folder = folders[0];
    //     this.create(new Folder(folder.id, 'folder1'));
    //     this.create(new Folder(folder.id, 'folder2'));
    //     this.create(new Folder(folder.id, 'folder3'));
    //   }
    // });
    // this.create(new Folder(null, 'folder1'));
    // this.create(new Folder(null, 'folder2'));
    // this.create(new Folder(null, 'folder3'));
  }
}
