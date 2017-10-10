import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Runtime
_ENV_.production && enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
