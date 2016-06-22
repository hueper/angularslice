import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { Observable } from 'rxjs';
const Humane = require('humane-js');

import { BoardComponent } from "../board";
import { SidebarComponent } from "../sidebar";
import { ToolbarComponent } from "../toolbar";
import { ImageService, FolderService } from "../shared/services";
import { Folder } from "../shared/models";


@Component({
  selector: 'editor',
  template: require('./editor.component.jade')(),
  styles: [ require('./editor.component.scss') ],
  directives: [
    BoardComponent,
    SidebarComponent,
    ToolbarComponent,
    MD_ICON_DIRECTIVES
  ]
})
export class EditorComponent {
  logo: any;
  sub: any;
  currentFolder: Folder;

  githubAuth() {
    const authUrl = 'https://github.com/login/oauth/authorize?client_id=ac28f4f2805e50fcdde3';
    const _oauthWindow = window.open(authUrl, 'GitHub Auth', 'width=800,height=400');

    const _oauthInterval = window.setInterval(() => {
      if (_oauthWindow.closed) {
        window.clearInterval(_oauthInterval);
        Humane.log('Awesome! See you next time!');
      }
    }, 1000);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private folderService: FolderService,
    private imageService: ImageService
  ) {

    this.sub = this.router.routerState.queryParams.take(1)
      .subscribe(params => {
        console.log('ROUTING', params);

        if (params['folderId']) {
          this.folderService.setCurrentById(params['folderId']);
        }

        if (params['imageId']) {
          this.imageService.setCurrentById(params['imageId']);
        }
      });

    Observable.combineLatest(this.folderService.currentSource, this.imageService.currentSource)
      .subscribe((combinedData) => {
        let currentFolder, currentImage;
        [currentFolder, currentImage] = combinedData;

        this.currentFolder = currentFolder;

        // TODO: This part is not working yet, with @angular/router@3.0.0.alpha
        if(currentFolder && currentImage) {
          // this.router.navigate([], { queryParams: { folderId: currentFolder.id, imageId: currentImage.id } });
        }


      });


    this.logo = require('../shared/assets/img/angular.svg');
  }
}
