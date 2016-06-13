import { provideRouter, RouterConfig } from '@angular/router';

import { EditorComponent } from './app/editor';

const routes: RouterConfig = [
  { path: '/editor', index: true, component: EditorComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
