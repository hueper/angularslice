import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';

const Humane = require('humane-js');

import { DialogService, ImageService, FolderService, ProjectService, UserService } from "../shared/services";
import { Folder } from "../shared/models";
import { ExportService } from "../shared/services/export.service";


@Component({
  selector: 'editor',
  template: require('./editor.component.pug')(),
  styles: [require('./editor.component.scss')],
})
export class EditorComponent {
  logo: any;
  sub: any;
  currentFolder: Folder;
  private loading: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private exportService: ExportService,
              private dialogService: DialogService,
              private folderService: FolderService,
              private imageService: ImageService,
              private projectService: ProjectService,
              private userService: UserService) {

    this.sub = this.route.queryParams.take(1)
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

  pushToGithub() {
    this.dialogService.openGithubDialog().then((res) => {
      // this.loading = true;
      // this.projectService.generate(res).subscribe((res: any) => {
      //   if (res.success) {
      //     Humane.log('Awesome');
      //   } else {
      //     TODO: the request was dismissed
      // }
      // this.loading = false;
      // });
    }).catch(err=> {

    });
  }

  reset() {
    localStorage.clear();
    console.log('LocalStorage is cleared');
    location.reload();
  }

  export() {
    this.dialogService.openExportDialog().then(result => {
      if (result == "zip") {

        this.exportService.exportZip();

      } else if (result !== null) {
        Humane.log('Sorry, this option is not available yet. Use ZIP until that.')
      } else {
        Humane.log('Ooops, something bad happened. Please get in touch.')
      }
    }).catch(err => {
    });
  }

}
