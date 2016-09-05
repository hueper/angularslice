import { Injectable } from '@angular/core';

import { HttpService } from './http.service.ts';
import { FolderService } from './folder.service.ts';

@Injectable()
export class ProjectService {
  constructor(
    private folderService: FolderService,
    private httpService: HttpService
  ) {}

  generate(repoName: string) {
    let params = {
      folders: this.folderService.dataSource.getValue(),
      repositoryName: repoName
    }

    // return this.httpService.post('/generate', params).map(res => res.json());
  }
}
