import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalsComponent } from './approvals.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ApprovalDetailsComponent } from './dialogs/approval-details/approval-details.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ApprovalsComponent,
    ApprovalDetailsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatChipsModule,
    MatButtonModule
    
  ],
  exports: [ApprovalsComponent]
})
export class ApprovalsModule { }
