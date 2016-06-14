import {Component} from "@angular/core";
import {ComponentElement} from "./component-element";
import {Folder, File} from "../shared/models";
import {FolderService, FileService} from "../shared/services";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'sidebar',
  styles: [ require('./sidebar.component.scss') ],
  template: require('./sidebar.component.jade')(),
  providers: [
  ],
  directives: [
    ComponentElement
  ]
})
export class SidebarComponent {
  public folders:Observable<Folder[]>;
  public files:Observable<File[]>;
  private currentFolder:Observable<Folder>;


  constructor(private fileService:FileService,
              private folderService:FolderService
  ) {
    this.files = fileService.filter(file => file.folderId === null || file.folderId === undefined);
    this.folders = folderService.filter(folder => folder.folderId === null || folder.folderId === undefined);

    this.currentFolder = this.folderService.currentSource;
    //   .subscribe((folders: Folder[]) => {
    //   this.folders = folders;
    // });
  }

}
