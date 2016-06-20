import { bootstrap } from "@angular/platform-browser-dynamic";
import { provide } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
import { APP_BASE_HREF } from "@angular/common";
import { MdIconRegistry } from "@angular2-material/icon";
import { MODAL_BROWSER_PROVIDERS } from "angular2-modal/platform-browser";
import { Angulartics2 } from 'angulartics2';

import { APP_ROUTER_PROVIDERS } from "app.routes.ts";
import { AppComponent } from "./app/app.component.ts";
import {
  AreaService,
  FileService,
  FolderService,
  ImageService,
  RawImageService,
  TemplateService
} from "./app/shared/services";

require('./app/shared/scss/styles.scss');

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  Angulartics2,
  APP_ROUTER_PROVIDERS,
  ...MODAL_BROWSER_PROVIDERS, MdIconRegistry,
  AreaService, FileService, FolderService, ImageService, RawImageService, TemplateService,

  provide(APP_BASE_HREF, {useValue: location.pathname})
]).catch((error) => {
  console.error('Error during app bootstrapping', error)
});
