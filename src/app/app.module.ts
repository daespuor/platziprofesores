import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {TeacherListComponent} from './teachers/teacher-list.component';
import {TeacherDetailComponent} from './teachers/teacher-detail.component';
import {TeacherSocialMediaAddComponent} from './teachers/teacher-socialMedia-add.component';
import {TeacherFormComponent} from './teachers/teacher-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ImageErrorComponent} from './teachers/image-error.component';
import {SocialMediaListComponent} from './socialMedias/socialMedia-list.component';
import {ScreenComponent} from './screen.component';
import {SocialMediaAddComponent} from './socialMedias/socialMedia-add.component';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material.module';
import RoutesModule from './app.routes.module';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    TeacherListComponent,
    TeacherDetailComponent,
    TeacherSocialMediaAddComponent,
    TeacherFormComponent,
    ImageErrorComponent,
    SocialMediaListComponent,
    ScreenComponent,
    SocialMediaAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
