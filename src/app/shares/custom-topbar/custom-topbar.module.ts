import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTopbarComponent } from './custom-topbar.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';


@NgModule({
  declarations: [
    CustomTopbarComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    CdkMenuModule
  ],
  exports:[CustomTopbarComponent]
})
export class CustomTopbarModule { }
