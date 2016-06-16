import {Component, Input, ElementRef} from "@angular/core";
import {Folder, File, Image} from "../../shared/models";
import {FolderService, FileService, ImageService, DialogService} from "../../shared/services";
import {Observable} from "rxjs/Rx";
import {MD_ICON_DIRECTIVES} from "@angular2-material/icon"

@Component({
  selector: 'component-element',
  styles: [require('./component-element.component.scss')],
  template: require('./component-element.component.jade')(),
  directives: [ComponentElement, MD_ICON_DIRECTIVES]
})
export class ComponentElement {

  @Input() folder:Folder;

  private folderIcon:string;
  private isOpen:boolean;
  private editComponent:boolean;

  private currentFolder:Folder;
  private folders:Observable<Folder[]>;
  private files:Observable<File[]>;
  private images:Observable<Image[]>;

  constructor(private imageService:ImageService,
              private folderService:FolderService,
              private fileService:FileService,
              private dialogService:DialogService) {

    this.images = this.imageService.filter(image => this.folder.id == image.folderId)
    this.folders = folderService.filter(folder => folder.folderId === this.folder.id);
    this.files = fileService.filter(file => file.folderId === this.folder.id);

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
    this.folderService.setCurrentById(this.folder.id);
    return false;
  }
  
  deleteComponent(event, folder) {
    if (event) {
      event.stopPropagation();
    }
    if(folder.folderId) {
      this.folderService.delete(folder);
    }
  }
  setEditComponent(folderEdit) {
    if(this.currentFolder.id == this.folder.id) {
      this.editComponent = true;
      setTimeout(() => {
        folderEdit.focus();
      });
    }
  }
  saveComponent() {
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
