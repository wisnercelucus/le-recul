import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashSlideComponent } from './flash-slide.component';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';



@NgModule({
  declarations: [
    FlashSlideComponent
  ],

  imports: [
    CommonModule,
    MatIconModule,
    CarouselModule
  ],

  exports: [
    FlashSlideComponent
  ]
  
})
export class FlashSlideModule { }
