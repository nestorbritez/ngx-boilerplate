import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { CommonsModule } from './commons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    CommonsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {}
}
