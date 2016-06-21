import { Component } from "@angular/core";
import { ComponentElementComponent } from "./component-element";
import { Folder, File } from "../shared/models";
import { FolderService, FileService } from "../shared/services";
import { Observable } from "rxjs/Rx";
import { MD_ICON_DIRECTIVES } from "@angular2-material/icon"

@Component({
  selector: 'sidebar',
  styles: [ require('./sidebar.component.scss') ],
  template: require('./sidebar.component.jade')(),
  providers: [
  ],
  directives: [
    ComponentElementComponent,
    MD_ICON_DIRECTIVES
  ]
})
export class SidebarComponent {
  public folders:Observable<Folder[]>;
  public files:Observable<File[]>;
  private currentFolders:Observable<Folder>;
  private currentFolder: Folder;


  constructor(private fileService:FileService,
              private folderService:FolderService
  ) {
    this.files = fileService.filter(file => file.folderId === null || file.folderId === undefined);
    this.folders = folderService.filter(folder => folder.folderId === null || folder.folderId === undefined);

    this.currentFolders = this.folderService.currentSource;

    folderService.currentSource.subscribe(folder => {
      this.currentFolder = folder;
    });

  }

  createComponent() {
    let currentId = this.currentFolder._id;
    this.folderService.create(new Folder(currentId, 'component'));
  }
}
