import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ComponentElement } from './component-element';
import { Folder } from '../shared/models';
import { FolderService } from '../shared/services';

@Component({
  selector: 'sidebar',
  styles: [ require('./sidebar.component.scss') ],
  template: require('./sidebar.component.jade')(),
  providers: [
    FolderService
  ],
  directives: [
    ComponentElement
  ]
})
export class SidebarComponent {
  public folders: Folder[];

  constructor(
    private folderService: FolderService
  ) {
    folderService.dataSource.subscribe((folders: Folder[]) => {
      this.folders = folders;
    });
  }

}
