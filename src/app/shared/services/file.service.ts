import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {File, Template} from "../models";
import {FolderService} from "./folder.service";
import {TemplateService} from "./template.service";

@Injectable()
export class FileService extends BaseService<File> {
  private tsTemplate:Template;
  private htmlTemplate:Template;
  private styleTemplate:Template;

  constructor(private templateService:TemplateService,
              private folderService:FolderService) {
    super();

    templateService.filter(f => f.extension.toLowerCase() === 'ts').subscribe((t:Template[]) => {
      this.tsTemplate = t[0];
    });

    templateService.filter(f => f.extension.toLowerCase() === 'html').subscribe((t:Template[]) => {
      this.htmlTemplate = t[0];
    });

    templateService.filter(f => f.extension.toLowerCase() === 'css').subscribe((t:Template[]) => {
      this.styleTemplate = t[0];
    });

    this.folderService.createSource.subscribe(folder=> {
      this.create(new File(folder.id, this.tsTemplate.id, folder.name + "." + this.tsTemplate.extension));
      this.create(new File(folder.id, this.htmlTemplate.id, folder.name + "." + this.htmlTemplate.extension));
      this.create(new File(folder.id, this.styleTemplate.id, folder.name + "." + this.styleTemplate.extension));
    });
  }


}
