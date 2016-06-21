import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class HttpService {
  constructor(
    private http: Http
  ) {
    super();

    this.folderService.deleteSource.subscribe(folder => {
      this.find({ folderId: folder.id }).map( (area) => {
        this.delete(area);
      });
    });
  }

}
