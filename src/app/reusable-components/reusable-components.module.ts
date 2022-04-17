import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgGaleryComponent } from './img-galery/img-galery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImgCarousalComponent } from './img-carousal/img-carousal.component';
import { AccordionModule } from './accordion/accordion.module';
import { DrawerComponent } from './drawer/drawer.component';
import { FlipCardModule } from './flip-card/flip-card.module';


@NgModule({
  declarations: [
    ImgGaleryComponent,
    ImgCarousalComponent,
    DrawerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AccordionModule,
    FlipCardModule,
   
  ],
  exports: [ImgGaleryComponent, 
    ImgCarousalComponent,
    AccordionModule,
    FlipCardModule,
    DrawerComponent
  ]
})
export class ReusableComponentsModule { }
