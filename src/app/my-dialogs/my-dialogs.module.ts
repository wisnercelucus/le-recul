import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';

import { DeleteConfirmComponent } from './dialogs/delete-confirm/delete-confirm.component';
import { MatButtonModule } from '@angular/material/button';

import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { GeneralConfirmComponent } from './dialogs/general-confirm/general-confirm.component';

@NgModule({
  declarations: [
    DeleteConfirmComponent,
    GeneralConfirmComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [DeleteConfirmComponent

  ],
})
export class MyDialogsModule { }
