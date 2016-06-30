import { Component, Input } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { MD_ICON_DIRECTIVES } from "@angular2-material/icon"
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';

import { FolderService, FileService, ImageService, DialogService } from "../../shared/services";
import { Folder, File, Image } from "../../shared/models";

@Component({
  selector: 'component-element',
  styles: [require('./component-element.component.scss')],
  template: require('./component-element.component.jade')(),
  directives: [ComponentElementComponent, MD_ICON_DIRECTIVES]
})
export class ComponentElementComponent {
  
  @Input() folder: Folder;
  
  private folderIcon: string;
  private isOpen: boolean;
  private editComponent: boolean;
  
  private currentFolder: Folder;
  private folders: Observable<Folder[]>;
  private files: Observable<File[]>;
  private images: Observable<Image[]>;
  
  private get isRoot(): boolean {
    return this.currentFolder.folderId == (null || undefined);
  }
  
  constructor(private imageService: ImageService,
              private ga: Angulartics2GoogleAnalytics,
              private folderService: FolderService,
              private fileService: FileService,
              private dialogService: DialogService) {
    
    this.images = this.imageService.filter(image => this.folder._id == image.folderId)
    this.folders = folderService.filter(folder => folder.folderId === this.folder._id);
    this.files = fileService.filter(file => file.folderId === this.folder._id);
    
    folderService.currentSource.subscribe(folder => {
      this.currentFolder = folder;
    });
    
    this.isOpen = false;
    this.toggleFolder(null);
  }
  
  selectFolder(event) {
    if (event) {
      event.preventDefault();
    }
    this.folderService.setCurrentById(this.folder._id);
    return false;
  }
  
  deleteComponent(event, folder) {
    this.ga.eventTrack('deleteFolder', { category: 'manually' });
    
    if (event) {
      event.stopPropagation();
    }
    
    // Confirm Dialog
    this.dialogService.openConfirmDialog().then((result) => {
      if (result && folder.folderId) {
        
        this.folderService.delete(folder);
      }
    });
    
  }
  
  setEditComponent(folderEdit) {
    if (this.currentFolder._id === this.folder._id && this.folder.folderId !== null) {
      this.editComponent = true;
      setTimeout(() => {
        folderEdit.focus();
      });
    }
  }
  
  saveComponent() {
    this.ga.eventTrack('renameFolder', { category: 'manually' });
    this.folderService.update(this.currentFolder);
    this.editComponent = false;
  }
  
  toggleFolder(event) {
    if (event) {
      event.preventDefault();
    }
    this.isOpen = !this.isOpen;
    this.folderIcon = this.isOpen ? '-' : '+';
    return false;
  }
}
