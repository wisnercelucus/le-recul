import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemaComponent } from './cinema.component';
import { CinemaRoutingModule } from './cinema-routing,module';
import { HomeComponent } from './home/home.component';
import { CinemaBannerComponent } from './cinema-banner/cinema-banner.component';
import { MoviesComponent } from './movies/movies.component';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AboutComponent } from './home/about/about.component';


@NgModule({
  declarations: [
    CinemaComponent,
    HomeComponent,
    CinemaBannerComponent,
    MoviesComponent,
    MoviesListComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    CinemaRoutingModule,
    ReusableComponentsModule,
    MatButtonModule,
    MatIconModule,
    CarouselModule
  ]
})
export class CinemaModule { }
