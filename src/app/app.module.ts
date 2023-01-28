import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DumyComponentsModule } from './shares/dumy-components/dumy-components.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedGlobalModule } from './shares/shared-global/shared-global.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SpacialPackagesModule } from './spacial-packages/spacial-packages.module';
import { NavigationModule } from './navigation/navigation.module';

import { QuillModule } from 'ngx-quill';
import { CookieModule } from 'ngx-cookie';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { LanguangeInterceptorService } from './language.interceptor';
import { LocaleService } from './locale.service';


const  toolbar = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean'],
  
  ['link',]                                     // remove formatting button

  //['link', 'image',]                         // link and image, video
]




@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    //HeaderComponent,
    //SidebarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    NavigationModule,
    DumyComponentsModule,
    CarouselModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedGlobalModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatListModule,
    SpacialPackagesModule,
    CookieModule.withOptions(),

    QuillModule.forRoot({
      suppressGlobalRegisterWarning: true,
      modules: {
        syntax: true,
        toolbar:toolbar,
      }
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true},  
    {
      provide: LOCALE_ID,
      useFactory: (localeService: LocaleService) => {
        console.log('locale ID', localeService.getLanguage());
        return localeService.getLanguage();
      },
      deps: [LocaleService]
    },  
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LanguangeInterceptorService,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
