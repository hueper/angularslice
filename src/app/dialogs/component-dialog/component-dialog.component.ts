import * as _ from "lodash";
import { Component, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { ModalComponent, DialogRef } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { Subscription } from "rxjs";

const Humane = require('humane-js');

import { FolderService } from "../../shared/services";
import { AnalyticsService } from "../../shared/services/analytics.service";

@Component({
  selector: 'component-dialog',
  template: require('./component-dialog.pug')(),
  styles: [require('./component-dialog.component.scss')],
})
export class ComponentDialogComponent implements ModalComponent<BSModalContext>, OnDestroy, AfterViewInit {
  component: any;

  @ViewChild('componentName') private componentName: any;

  public folders: any[];
  private subscriptions: Subscription[] = [];
  private hasImage: boolean = true;

  constructor(public dialog: DialogRef<BSModalContext>,
              private ga: AnalyticsService,
              private folderService: FolderService,
              private detector: ChangeDetectorRef) {
    this.subscriptions.push(folderService.dataSource.map(x =>
      x.map(folder => ({ id: folder._id, text: folder.name }))
    ).subscribe((folders: any[]) => {
      this.folders = folders;
      console.log("this.folders => ", this.folders);
    }));
    this.component = {
      type: 'new',
      attach: true,
      folder: null,
    };


    this.hasImage = this.dialog.context['hasImage'];
  }

  eventHandler(event) {
    if (event.which === 13) {
      event.preventDefault();
      this.send();
      return false;
    }
  }

  ngOnDestroy() {
    _.each(this.subscriptions, subscription => {
      subscription.unsubscribe();
    });
  }

  changeAttachImage(event) {
    this.component.attach = event.checked;
    if (!event.checked) {
      this.ga.eventTrack('selectNoImage', { category: 'areaDialog' });
    }
  }

  changeExistingComponent() {
    this.ga.eventTrack('selectExistingComponent', { category: 'areaDialog' });
  }

  send() {
    if (this.component.type === 'new' && !this.component.newFolderName) {
      Humane.log('Component name is missing', { timeout: 4000, clickToClose: true });
      return;
    }
    if (!this.component.newImageName) {
      this.component.newImageName = this.component.newFolderName;
    }


    console.log("this.component => ", this.component);

    let result = {
      action: 'save',
      data: this.component
    };
    this.dialog.close(result);
  }

  ngAfterViewInit(): any {
    if (!this.hasImage) {
      if (this.componentName) {
        this.componentName.focus();
        this.detector.detectChanges();
      }
    }
  }

  close() {
    this.dialog.dismiss();
  }
}
