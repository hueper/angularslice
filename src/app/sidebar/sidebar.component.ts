import { Component } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { MD_ICON_DIRECTIVES } from "@angular2-material/icon"
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';

import { ComponentElementComponent } from "./component-element";
import { FolderService, FileService } from "../shared/services";
import { Folder, File } from "../shared/models";
import { DialogService } from "../shared/services/dialog.service";

@Component({
  selector: 'sidebar',
  styles: [require('./sidebar.component.scss')],
  template: require('./sidebar.component.jade')(),
  providers: [],
  directives: [
    ComponentElementComponent,
    MD_ICON_DIRECTIVES
  ]
})
export class SidebarComponent {
  public folders: Observable<Folder[]>;
  public files: Observable<File[]>;
  private currentFolders: Observable<Folder>;
  private currentFolder: Folder;


  constructor(private fileService: FileService,
              private ga: Angulartics2GoogleAnalytics,
              private folderService: FolderService,
              private dialogService: DialogService) {
    this.files = fileService.filter(file => file.folderId === null || file.folderId === undefined);
    this.folders = folderService.filter(folder => folder.folderId === null || folder.folderId === undefined);

    this.currentFolders = this.folderService.currentSource;

    folderService.currentSource.subscribe(folder => {
      this.currentFolder = folder;
    });

  }

  createComponent() {
    this.dialogService.openCreateComponentDialog(false).then(dialogResult => {
      this.ga.eventTrack('createFolder', { category: 'byButton'} );
      this.folderService.create(new Folder(this.currentFolder._id, dialogResult.data.newFolderName));
    });
  }
}
