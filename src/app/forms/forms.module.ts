import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { FormsRouting } from './forms-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    CommonModule,
    FormsRouting,
    FormsModule
  ]
})
export class MyFormsModule { }
