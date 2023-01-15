import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsFormComponent } from './documents-form/documents-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { RecordDocumentsComponent } from './record-documents/record-documents.component';

@NgModule({
  declarations: [
    DocumentsFormComponent,
    RecordDocumentsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxFileDropModule,
    MatButtonModule,
    MatListModule,
  ],

  exports: [DocumentsFormComponent, RecordDocumentsComponent]
})
export class RecordDocumentsModule { }
