import { NgModule, ComponentFactoryResolver, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule }   from '@angular/forms';
import { APP_BASE_HREF } from "@angular/common";
import { HTTP_PROVIDERS, HttpModule } from "@angular/http";


import { MdIconRegistry } from "@angular2-material/icon";
import { ModalModule } from "angular2-modal/angular2-modal.module";
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { Angulartics2 } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
import { APP_ROUTER_PROVIDERS } from "app.routes.ts";
import {
  AreaService,
  FileService,
  FolderService,
  HttpService,
  ImageService,
  RawImageService,
  ProjectService,
  TemplateService,
  UserService
} from "./shared/services";
import { TooltipService } from "./shared/services/tooltip.service";
import { AnalyticsService } from "./shared/services/analytics.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    Angulartics2GoogleAnalytics,
    AnalyticsService,

    Angulartics2,
    APP_ROUTER_PROVIDERS,
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
