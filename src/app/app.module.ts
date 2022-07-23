import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { DumyComponentsModule } from './shares/dumy-components/dumy-components.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedGlobalModule } from './shares/shared-global/shared-global.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { SpacialPackagesModule } from './spacial-packages/spacial-packages.module';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    DumyComponentsModule,
    CarouselModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedGlobalModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatListModule,
    SpacialPackagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
