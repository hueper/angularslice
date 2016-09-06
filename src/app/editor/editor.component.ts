import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';

const Humane = require('humane-js');

import { DialogService, ImageService, FolderService, ProjectService, UserService } from "../shared/services";
import { Folder } from "../shared/models";
// import { JSZip } from 'jszip';
var JSZip = require('jszip');
var FileSaver = require('file-saver');
console.log({JSZip, FileSaver});
// import * as saveAs from 'file-saver';


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

        let folders = this.folderService.dataSource.getValue();

        let directoryGenerator = (zipFolder: any, id: string, level: number = 0) => {
          let containedFolders = folders.filter(folder => folder.folderId === id);
          // TODO: add files

          for (var i in containedFolders) {
            let newZipFolder = zipFolder.folder(containedFolders[i].name);
            directoryGenerator(newZipFolder, containedFolders[i]._id, level+1);
          }

          if (level === 0) {
            zipFolder.generateAsync({type:"blob"})
              .then(function(content) {
                console.log(content);
                // see FileSaver.js
                FileSaver.saveAs(content, "ngslice-project.zip");
              });
          }
        }
        let rootFolder = folders.filter(folder => folder.folderId === null)[0];
        directoryGenerator(new JSZip(), rootFolder._id);



        // var zip = new JSZip();
        //
        // Creating a simple file
        // zip.file("Hello.txt", "Hello World\n");
        // Creating a folder
        // var img = zip.folder("images");
        // var secFolder = img.folder('secondary');
        // img.file("some.txt", 'Hey man');
        // zip.generateAsync({type:"blob"})
        //   .then(function(content) {
        //     console.log(content);
        //     see FileSaver.js
            // FileSaver.saveAs(content, "ngslice-project.zip");
          // });

        // for (var i = 0; i < folders.length; folders++) {
        //
        // }
        Humane.log('Work in Progress');


        // this.pushToGithub();
      } else if (result !== null) {
        Humane.log('Sorry, this option is not available yet. Use ZIP until that.')
      } else {
        Humane.log('Ooops, something bad happened. Please get in touch.')
      }
    }).catch(err => {
    });
  }

}
