import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-approval-details',
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.scss']
})
export class ApprovalDetailsComponent implements OnInit {
  approval: any = {}
  constructor(
    public dialogRef: MatDialogRef<ApprovalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
      this.approval = data
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
