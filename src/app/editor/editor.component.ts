import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { Observable } from 'rxjs';

const Humane = require('humane-js');

import { BoardComponent } from "../board";
import { SidebarComponent } from "../sidebar";
import { ToolbarComponent } from "../toolbar";
import { DialogService, ImageService, FolderService, ProjectService, UserService } from "../shared/services";
import { Folder } from "../shared/models";
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from "@angular2-material/progress-circle/progress-circle";


@Component({
  selector: 'editor',
  template: require('./editor.component.jade')(),
  styles: [require('./editor.component.scss')],
  directives: [
    BoardComponent,
    SidebarComponent,
    ToolbarComponent,
    MD_ICON_DIRECTIVES,
    MD_PROGRESS_CIRCLE_DIRECTIVES
  ]
})
export class EditorComponent {
  logo: any;
  sub: any;
  currentFolder: Folder;
  private loading: boolean = false;

  pushToGithub() {
    this.dialogService.openGithubDialog().then((res) => {
      this.loading = true;
      this.projectService.generate(res).subscribe((res: any) => {
        if (res.success) {
          Humane.log('Awesome');
        } else {
          // TODO: the request was dismissed
        }
        this.loading = false;
      });
    }).catch(err=> {

    });
  }

  export() {
    this.dialogService.openExportDialog().then(result => {
      if (result == "github") {
        this.pushToGithub();
      } else if (result !== null) {
        // TODO: Show an alert to the user for we're not ready with those functions yet
        alert("Not implemented yet");
      } else {
        // TODO: the popup was dismissed (closed without answer!)
      }
    }).catch(err => {
    });
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private folderService: FolderService,
              private imageService: ImageService,
              private projectService: ProjectService,
              private userService: UserService) {

    this.sub = this.router.routerState.queryParams.take(1)
                   .subscribe(params => {
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
                if (currentFolder && currentImage) {
                  // this.router.navigate([], { queryParams: { folderId: currentFolder.id, imageId: currentImage.id } });
                }


              });


    this.logo = require('../shared/assets/img/angular.svg');
  }
}
