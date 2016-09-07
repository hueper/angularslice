import { NgModule, ComponentFactoryResolver, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule }   from '@angular/forms';
import { APP_BASE_HREF } from "@angular/common";
import { HttpModule } from "@angular/http";


import { MdIconRegistry } from "@angular2-material/icon";
import { ModalModule } from "angular2-modal/angular2-modal.module";
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { Angulartics2 } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
import { appRoutingProviders, routing } from "app.routes.ts";

import {
  AreaService,
  FileService,
  FolderService,
  HttpService,
  ImageService,
  RawImageService,
  TooltipService,
  AnalyticsService,
  ProjectService,
  TemplateService,
  UserService,
  ExportService,
} from "./shared/services";

import { TooltipDirective } from "./shared/directives/tooltip/tooltip.directive";
import { AreaComponent } from "./board/area/area.component";
import { ImageBarComponent } from "./board/image-bar/image-bar.component";
import { SlicedImageComponent } from "./sliced-image/sliced-image.component";
import { BoardComponent } from "./board/board.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { EscapeHtmlPipe } from "./shared/pipes/EscapeHtml";
import { ComponentElementComponent } from "./sidebar/component-element/component-element.component";
import { EditorComponent } from "./editor/editor.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { TooltipContainerComponent } from "./shared/directives/tooltip/tooltip-component/tooltip-container.component";
import { ConfirmDialogComponent } from "./dialogs/confirm-dialog/confirm-dialog.component";
import { GithubDialogComponent } from "./dialogs/github-dialog/github-dialog.component";
import { ComponentDialogComponent } from "./dialogs/component-dialog/component-dialog.component";
import { ExportDialogComponent } from "./dialogs/export-dialog/export-dialog.component";

import { MdUniqueSelectionDispatcher } from "@angular2-material/core";
import { MdButton } from "@angular2-material/button";
import { MdIcon } from "@angular2-material/icon";
import { MdInput } from "@angular2-material/input";
import { MdCheckbox } from "@angular2-material/checkbox";
import { MdRadioButton, MdRadioGroup } from "@angular2-material/radio";

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    BoardComponent,
    EditorComponent,
    SidebarComponent,
    ImageBarComponent,
    SlicedImageComponent,
    ToolbarComponent,
    TooltipContainerComponent,
    ConfirmDialogComponent,
    ComponentDialogComponent,
    ExportDialogComponent,
    GithubDialogComponent,
    TooltipDirective,
    MdButton,
    MdInput,
    MdIcon,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    EscapeHtmlPipe,
    ComponentElementComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ComponentDialogComponent,
    ExportDialogComponent,
    GithubDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    routing
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // directives: [
  //   MD_ICON_DIRECTIVES
  // ],
  providers: [
    Angulartics2GoogleAnalytics,
    AnalyticsService,

    Angulartics2,
    appRoutingProviders,
    MdIconRegistry,
    MdUniqueSelectionDispatcher,

    AreaService,
    FileService,
    FolderService,
    HttpService,
    ImageService,
    RawImageService,
    ProjectService,
    TemplateService,
    TooltipService,
    UserService,
    ExportService,
    {
      provide: APP_BASE_HREF,
      useValue: location.pathname,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
