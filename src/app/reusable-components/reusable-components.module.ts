import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgGaleryComponent } from './img-galery/img-galery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImgCarousalComponent } from './img-carousal/img-carousal.component';
import { AccordionModule } from './accordion/accordion.module';
import { DrawerComponent } from './drawer/drawer.component';
import { FlipCardModule } from './flip-card/flip-card.module';
import { CountTimerComponent } from './count-timer/count-timer.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ImgGaleryComponent,
    ImgCarousalComponent,
    DrawerComponent,
    CountTimerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AccordionModule,
    FlipCardModule,
    MatIconModule
   
  ],
  exports: [ImgGaleryComponent, 
    ImgCarousalComponent,
    AccordionModule,
    FlipCardModule,
    DrawerComponent,
    CountTimerComponent,
  ]
})
export class ReusableComponentsModule { }
