import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorHandlerService, OpenConfirmDialog } from 'src/app/error-handler.service';
import { RecordApprovalService } from 'src/app/record-details/services/record-approval.service';
import { SubSink } from 'subsink';
import { GeneralConfirmComponent } from '../general-confirm/general-confirm.component';

@Component({
  selector: 'app-approval-form-dialog',
  templateUrl: './approval-form-dialog.component.html',
  styleUrls: ['./approval-form-dialog.component.scss']
})
export class ApprovalFormDialogComponent implements OnInit, OnDestroy, OpenConfirmDialog {
  subs = new SubSink()
  submission_mode = true;
  front_root_path = ''
  pk: any;
  
  record: any;
  constructor(
    private _recordApprovalService: RecordApprovalService,
    private _errorHandler:ErrorHandlerService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ApprovalFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.record = data.record
    this.front_root_path = data.front_root_path
    
    this.submission_mode = data.submission_mode
    this.pk = data.pk

  }

  openDialog(success:boolean, context: any){
    this.dialog.open(GeneralConfirmComponent,
      {data: this._errorHandler.getDialogContext(success, context)});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  onNoClick(result?: any): void {
    this.dialogRef.close(result);
  }

  onSubmit(f: NgForm){
    //console.log(f.value)
    if(this.submission_mode){
      const context = this._errorHandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
      'Form registered successfully.', 
      'We could not send your approval request.'
      )
     this.subs.add(
        this._recordApprovalService.saveRecordApprovalRequest(f.value).subscribe(
          {
            next: (res: any)=> {
              this.onNoClick()
            },
            error: (err:HttpErrorResponse) =>{
              const detail = this._errorHandler.getErrorMessage(err)
              context.errorMessage = detail
              this.openDialog(false, context);
            }
          }
        )
      )
    }else{
      const context = this._errorHandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
      'Form registered successfully.', 
      'We could not reject the approval request..'
      )

      this._recordApprovalService.onRejectRecordApproval(this.pk, f.value).subscribe(
        {
          next: (res: any)=>{
            this.onNoClick('yes')
          },
          error: (err: HttpErrorResponse) => {
            const detail = this._errorHandler.getErrorMessage(err)
            context.errorMessage = detail
            this.openDialog(false, context);
            this.onNoClick()
          }
        }
      );
    }

  }




}
