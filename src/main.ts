import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from './app/app.module';

require('./app/shared/scss/styles.scss');

platformBrowserDynamic().bootstrapModule(AppModule);
