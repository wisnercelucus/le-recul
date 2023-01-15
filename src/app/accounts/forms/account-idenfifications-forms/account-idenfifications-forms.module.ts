import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountIdenfificationsFormsComponent } from './account-idenfifications-forms.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AccountIdenfificationsFormsComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [AccountIdenfificationsFormsComponent]
})
export class AccountIdenfificationsFormsModule { }
