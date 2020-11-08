import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgsearchComponent } from './imgsearch/imgsearch.component';
import { ImguploadComponent } from './imgupload/imgupload.component';
import { UploadService } from './upload.service';
import { SearchService } from './search.service';
import { DocumentationComponent } from './documentation/documentation.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ImgsearchComponent,
    ImguploadComponent,
    DocumentationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [UploadService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
