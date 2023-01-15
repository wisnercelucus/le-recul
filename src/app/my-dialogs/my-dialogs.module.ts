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
import { ApprovalFormDialogComponent } from './dialogs/approval-form-dialog/approval-form-dialog.component';

@NgModule({
  declarations: [
    DeleteConfirmComponent,
    GeneralConfirmComponent,
    ApprovalFormDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    
  ],
  exports: [DeleteConfirmComponent

  ],
})
export class MyDialogsModule { }
