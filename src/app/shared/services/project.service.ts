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
      files: this.folderService.dataSource.getValue(),
      repository_name: repoName
    }

    return this.httpService.post('/generate', repoName).map(res => res.json());
  }
}
