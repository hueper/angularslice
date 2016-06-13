import {Component, Input} from "@angular/core";
import {Folder, File, Image} from "../../shared/models";
import {FolderService, FileService, ImageService} from "../../shared/services";
import {Observable} from "rxjs/Rx";
import {MD_ICON_DIRECTIVES} from "@angular2-material/icon/icon";

@Component({
  selector: 'component-element',
  styles: [require('./component-element.component.scss')],
  template: require('./component-element.component.jade')(),
  directives: [MD_ICON_DIRECTIVES, ComponentElement]
})
export class ComponentElement {

  @Input() folder:Folder;

  private folderIcon:string;
  private isOpen:boolean;

  private folders:Observable<Folder[]>;
  private files:Observable<File[]>;
  private images:Observable<Image[]>;

  constructor(private imageService:ImageService,
              private folderService:FolderService,
              private fileService:FileService) {
    this.images = this.imageService.filter(image => this.folder.id == image.folderId)
    this.folders = folderService.filter(folder => folder.folderId === this.folder.id);
    this.files = fileService.filter(file => file.folderId === this.folder.id);

    this.isOpen = false;
    this.toggleFolder(null);
  }

  toggleFolder(event) {
    if (event) {
      event.preventDefault();
    }
    this.isOpen = !this.isOpen;
    this.folderIcon = this.isOpen ? 'folder_open' : 'folder';
    return false;
  }
}
