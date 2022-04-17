import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCardComponent } from './show-card/show-card.component';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { BlogCardComponent } from './blog-card/blog-card.component';



@NgModule({
  declarations: [
    ShowCardComponent,
    BlogCardComponent
  ],
  imports: [
    MaterialsModule,
    CommonModule
  ],
  exports: [ShowCardComponent, 
    BlogCardComponent]
})
export class DumyComponentsModule { }
