import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {APP_BASE_HREF} from "@angular/common";
import {ROUTER_PROVIDERS} from "@angular/router";
import {AppComponent} from "./app/app.component.ts";
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
  ROUTER_PROVIDERS,
  AreaService, FileService, FolderService, ImageService, RawImageService, TemplateService,
  provide(APP_BASE_HREF, {useValue: location.pathname})
]).catch((error) => {
  console.error('Error during app bootstrapping', error)
});