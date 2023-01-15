import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LookupFieldModule } from '../lookup-field/lookup-field.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RelatedRecordFormsComponent } from './related-record-forms.component';
import { QuillModule } from 'ngx-quill';
import { CascadeFormModule } from '../cascade-form/cascade-form.module';



@NgModule({
  declarations: [
    RelatedRecordFormsComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    LookupFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSelectModule,
    QuillModule,
    CascadeFormModule
  ],
  exports: [
    RelatedRecordFormsComponent
  ]
})
export class RelatedRecordFormsModule { }
