import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { File, Template } from "../models";
import { FolderService } from "./folder.service";
import { TemplateService } from "./template.service";

@Injectable()
export class FileService extends BaseService<File> {
  private tsTemplate:Template;
  private htmlTemplate:Template;
  private styleTemplate:Template;

  constructor(
    private templateService:TemplateService,
    private folderService:FolderService
  ) {
    super('files', File);

    templateService.filter(f => f.extension.toLowerCase() === 'component.ts').subscribe((t:Template[]) => {
      this.tsTemplate = t[0];
    });

    templateService.filter(f => f.extension.toLowerCase() === 'component.html').subscribe((t:Template[]) => {
      this.htmlTemplate = t[0];
    });

    templateService.filter(f => f.extension.toLowerCase() === 'component.css').subscribe((t:Template[]) => {
      this.styleTemplate = t[0];
    });

    this.folderService.createSource.subscribe(folder => {
      this.create(new File(folder._id, this.tsTemplate._id, folder.name + "." + this.tsTemplate.extension));
      this.create(new File(folder._id, this.htmlTemplate._id, folder.name + "." + this.htmlTemplate.extension));
      this.create(new File(folder._id, this.styleTemplate._id, folder.name + "." + this.styleTemplate.extension));
    });

    this.folderService.updateSource.subscribe(folder => {
      this.find({ folderId: folder._id }).map((file: File) => {
        var splittedName = file.name.split('.');
        splittedName[0] = folder.name;
        file.name = splittedName.join('.');
        this.update(file);
      });
    });

    this.folderService.deleteSource.subscribe(folder => {
      this.find({ folderId: folder._id }).map( (file) => {
        this.delete(file);
      });
    });
  }


}
