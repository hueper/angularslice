import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {APP_BASE_HREF} from "@angular/common";
import {APP_ROUTER_PROVIDERS} from "app.routes.ts";
import {AppComponent} from "./app/app.component.ts";
import {MODAL_BROWSER_PROVIDERS} from "angular2-modal/platform-browser";
import {MdIconRegistry} from "@angular2-material/icon";

import {
  AreaService,
  DialogService,
  FileService,
  FolderService,
  ImageService,
  RawImageService,
  TemplateService
} from "./app/shared/services";

require('./app/shared/scss/styles.scss');

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  ...MODAL_BROWSER_PROVIDERS,

  MdIconRegistry,
  DialogService,
  AreaService,
  FileService,
  FolderService,
  ImageService,
  RawImageService,
  TemplateService,
  provide(APP_BASE_HREF, {useValue: location.pathname})
]).catch((error) => {
  console.error('Error during app bootstrapping', error)
});
