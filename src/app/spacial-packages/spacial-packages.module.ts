import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacialPackagesComponent } from './spacial-packages.component';



@NgModule({
  declarations: [
    SpacialPackagesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[SpacialPackagesComponent]
})
export class SpacialPackagesModule { }
