import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MyImageCroperComponent } from './my-image-croper.component';

@NgModule({
  declarations: [
    MyImageCroperComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ImageCropperModule,
  ],
  exports: [MyImageCroperComponent]
})
export class MyImageCroperModule { }
