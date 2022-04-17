import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FooterComponent,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  exports: [FooterComponent, SignupFormComponent]
})
export class SharedGlobalModule { }
