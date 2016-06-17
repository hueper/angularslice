import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Folder } from "../models";

@Injectable()
export class FolderService extends BaseService<Folder> {

  private dummyBoolean:boolean = true;

  constructor() {
    super();
    this.create(new Folder(null, 'Application'));


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
