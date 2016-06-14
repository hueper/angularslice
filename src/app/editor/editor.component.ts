import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MD_ICON_DIRECTIVES} from "@angular2-material/icon";
import {Observable} from "rxjs";
import {BoardComponent} from "../board";
import {SidebarComponent} from "../sidebar";
import {ToolbarComponent} from "../toolbar";
import {ImageService, FolderService} from "../shared/services";


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
          this.folderService.setCurrentById(+params['folderId']);
        }

        if (params['imageId']) {
          this.imageService.setCurrentById(+params['imageId']);
        }
      });

    Observable.combineLatest(this.folderService.currentSource, this.imageService.currentSource)
      .subscribe((combinedData) => {
        let currentFolder, currentImage;
        [currentFolder, currentImage] = combinedData;
        console.debug('currentFolder.id => ', currentFolder.id);
        // TODO: This part is not working yet, with @angular/router@3.0.0.alpha
        if(currentFolder && currentImage) {
          this.router.navigate([], { queryParams: { folderId: currentFolder.id, imageId: currentImage.id } });
        }
      });


    this.logo = require('../shared/assets/img/angular.svg');
  }
}
