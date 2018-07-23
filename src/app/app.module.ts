import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxViewerModule } from 'ngx-viewer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
