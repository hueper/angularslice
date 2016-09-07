import { Injectable } from '@angular/core';

import { TemplateComponent } from '../templates/template-component.ts';
import { FolderService } from "./folder.service";

var JSZip = require('jszip');
var FileSaver = require('file-saver');
var ChangeCase = require('change-case');

@Injectable()
export class ExportService {
  constructor(
    private folderService: FolderService
  ) {

  }

  exportZip() {
    let folders = this.folderService.dataSource.getValue();


    // Recrusive function to generate the folder structure
    let directoryGenerator = (zipFolder: any, id: string, level: number = 0) => {
      let containedFolders = folders.filter(folder => folder.folderId === id);

      // Add files into the folder (every folder is a component for now)
      this.addFiles(zipFolder);

      // Add folders into the folder
      for (var i in containedFolders) {
        let newZipFolder = zipFolder.folder(containedFolders[i].name);
        directoryGenerator(newZipFolder, containedFolders[i]._id, level+1);
      }

    }

    // Let's start
    let zipFile = new JSZip();
    let rootFolder = folders.filter(folder => folder.folderId === null)[0];
    directoryGenerator(zipFile.folder('app'), rootFolder._id);
    zipFile.generateAsync({type:"blob"})
      .then(function(content) {
        // see FileSaver.js
        FileSaver.saveAs(content, "ngslice-project.zip");
      });
  }

  addFiles(zipFolder: any) {
    // TODO, add name replacing


    let folderNames = zipFolder.root.split('/');
    let folderName = folderNames[folderNames.length-2];
    console.log(zipFolder, zipFolder.root, folderNames, folderName);

    TemplateComponent.files.forEach(file => {
      let template = file.template;
      template = template.replace(/\{\{properCase name\}\}/g, ChangeCase.pascalCase(folderName));
      template = template.replace(/\{\{name\}\}/g, folderName);
      console.log(template, folderName);
      return zipFolder.file(`${folderName}.${file.extension}`, template);
    });
  }

  p
}
