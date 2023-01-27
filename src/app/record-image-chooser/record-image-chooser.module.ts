import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordImageChooserComponent } from './record-image-chooser.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    RecordImageChooserComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [RecordImageChooserComponent]
})
export class RecordImageChooserModule { }
