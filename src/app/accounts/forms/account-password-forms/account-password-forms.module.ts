import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPasswordFormsComponent } from './account-password-forms.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AccountPasswordFormsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    AccountPasswordFormsComponent
  ]
})
export class AccountPasswordFormsModule { }
