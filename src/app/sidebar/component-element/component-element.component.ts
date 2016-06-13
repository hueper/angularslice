import { Component, Input } from '@angular/core';
import {MD_ICON_DIRECTIVES} from '@angular2-material/icon';
import { Folder, Image } from '../../shared/models';
import {ImageService} from "../../shared/services";

import {Subscription} from "rxjs";

@Component({
  selector: 'component-element',
  styles: [ require('./component-element.component.scss') ],
  template: require('./component-element.component.jade')(),
  directives: [MD_ICON_DIRECTIVES]
})
export class ComponentElement {

  @Input() folder: Folder;

  private images:Image[] = [];
  private subscriptions:Subscription[] = [];

  constructor(
    private imageService:ImageService
  ) {
    // Look for new images without filtering
    this.subscriptions.push(this.imageService.filter(image => this.folder.id == image.folderId).subscribe((data:Image[]) => {
      console.log(data);
      this.images = data;
    }));
  }

}
