import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageChooserComponent } from './image-chooser.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxFileDropModule } from 'ngx-file-drop';



@NgModule({
  declarations: [
    ImageChooserComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    NgxFileDropModule
  ],
  exports: [ImageChooserComponent]
})
export class ImageChooserModule { }
