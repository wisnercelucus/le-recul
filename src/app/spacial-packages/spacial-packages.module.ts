import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacialPackagesComponent } from './spacial-packages.component';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SpacialPackagesComponent
  ],
  imports: [
    CommonModule,
    ReusableComponentsModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[SpacialPackagesComponent]
})
export class SpacialPackagesModule { }
