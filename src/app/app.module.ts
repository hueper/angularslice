import { NgModule, ComponentFactoryResolver, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule }   from '@angular/forms';
import { APP_BASE_HREF } from "@angular/common";
import { HttpModule } from "@angular/http";


import { MD_ICON_DIRECTIVES, MdIconRegistry } from "@angular2-material/icon";
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
  UserService
} from "./shared/services";

import { TooltipDirective } from "./shared/directives/tooltip/tooltip.directive";
import { AreaComponent } from "./board/area/area.component";
import { ImageBarComponent } from "./board/image-bar/image-bar.component";
import { SlicedImageComponent } from "./sliced-image/sliced-image.component";
import { BoardComponent } from "./board/board.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { EscapeHtmlPipe } from "./shared/pipes/EscapeHtml";
import { ComponentElementComponent } from "./sidebar/component-element/component-element.component";

import { MdButton } from "@angular2-material/button";
import { MdInput } from "@angular2-material/input";
import { MdCheckbox } from "@angular2-material/checkbox";
import { MdRadioButton, MdRadioGroup } from "@angular2-material/radio";

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    BoardComponent,
    SidebarComponent,
    ImageBarComponent,
    SlicedImageComponent,
    TooltipDirective,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    EscapeHtmlPipe,
    ComponentElementComponent,
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
    {
      provide: APP_BASE_HREF,
      useValue: location.pathname,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
