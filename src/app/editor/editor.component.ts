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
        console.log("res => ", res);
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
      console.log("result => ", result);
      if (result == "github") {
        this.pushToGithub();
      } else if (result !== null) {
        Humane.log('Sorry, this option is not available yet. Use GitHub until that.')
      } else {
        Humane.log('Ooops, something bad happened. Please get in touch.')
      }
    }).catch(err => {
      console.log(err);
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
