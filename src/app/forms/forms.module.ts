import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { FormsRouting } from './forms-routing.module';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LookupFieldModule } from './lookup-field/lookup-field.module';
import { ImageChooserModule } from '../shares/image-chooser/image-chooser.module';
import { QuillModule } from 'ngx-quill';
import { MyDialogsModule } from '../my-dialogs/my-dialogs.module';
import { CascadeFormModule } from './cascade-form/cascade-form.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    CommonModule,
    FormsRouting,
    FormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    LookupFieldModule,
    CascadeFormModule,
    ImageChooserModule,
    QuillModule,
    MyDialogsModule,
    MatButtonModule
  ]
})
export class MyFormsModule { }
