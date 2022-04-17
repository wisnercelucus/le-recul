import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './navigation/header/header.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AboutComponent } from './pages/about/about.component';
import { BannerComponent } from './pages/landing/banner/banner.component';
import { LatestShowsComponent } from './pages/landing/latest-shows/latest-shows.component';
import { TrendingBlogsComponent } from './pages/landing/trending-blogs/trending-blogs.component';
import { BusinesesComponent } from './pages/landing/busineses/busineses.component';
import { AboutLandingComponent } from './pages/landing/about-landing/about-landing.component';
import { TestimonialsComponent } from './pages/landing/testimonials/testimonials.component';
import { MediaComponent } from './pages/landing/media/media.component';
import { DumyComponentsModule } from './shares/dumy-components/dumy-components.module';
import { SectionComponent } from './pages/landing/section/section.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedGlobalModule } from './shares/shared-global/shared-global.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LandingComponent,
    AboutComponent,
    BannerComponent,
    LatestShowsComponent,
    TrendingBlogsComponent,
    BusinesesComponent,
    AboutLandingComponent,
    TestimonialsComponent,
    MediaComponent,
    SectionComponent,
    MainNavComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
