import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ErrorHandlerService, OpenConfirmDialog } from '../error-handler.service';
import { DeleteConfirmComponent } from '../my-dialogs/dialogs/delete-confirm/delete-confirm.component';
import { GeneralConfirmComponent } from '../my-dialogs/dialogs/general-confirm/general-confirm.component';
import { RecordApprovalService } from '../record-details/services/record-approval.service';
import { ApprovalDetailsComponent } from './dialogs/approval-details/approval-details.component';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalsComponent implements OnInit, OnDestroy, OpenConfirmDialog {
  subs = new SubSink()
  @Input() record: any;
  @Input() model='';


  @Input() hasPermissionApproveApproval = false
  @Input() hasPermissionApproveRecord = false
  @Input() hasPermissionRejectApprovalRequests = false
  @Input() hasPermissionSubmitApprovalRequests = false
  @Input() hasPermissionViewApprovalRequests = false
  @Input() hasPermissionRecallApprovalRequests = false
  @Input() hasPermissionDeleteApprovalRequests = false
  @Input() hasPermissionEditApprovalRequests = false
  @Input() hasPermissionAddApprovalRequests = false
  @Input() hasPermissionReviewApprovalRequests = false



  displayedColumns = [
    'id',
    'status',
    'submitted_by',
    'submitted_at',
    'star',
  ];
  dataSource: any[] = []

  constructor(private _recordApprovalService:RecordApprovalService, 
    private _errorHandler:ErrorHandlerService,
    private _router: Router,
    private ref: ChangeDetectorRef,
    private _dialog: MatDialog) { }


    openDialog(success:boolean, context: any){
      this._dialog.open(GeneralConfirmComponent,
        {data: this._errorHandler.getDialogContext(success, context)});
    }


  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    const data = {content_type: this.record.content_type, app_label: this.record.app_label, object_id: this.record.id}
    this. getRecordApprovalRequests(data);
    this.subs.add(this._recordApprovalService.approvalCreated.subscribe(res=>{
      this.dataSource = [res, ...this.dataSource]
      this.ref.detectChanges()
    }))
  }

  onViewApprovalDetails(id: string){
    const index = this.dataSource.findIndex(a=> a.id ===id)
    const ap = {...this.dataSource[index]}
    const dialogRef = this._dialog.open(ApprovalDetailsComponent, {
      width: '500px',
      data: ap,
    });
  }

  onReviewRecord(id: string){
    const context = this._errorHandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
    'Form registered successfully.', 
    'We could not perform the action.'
    )

    this.subs.add(
      this._recordApprovalService.onReviewRecordApproval(id).subscribe(
        {
          next: res=>{
            const index = this.dataSource.findIndex(app => app.id === id)
            const a = this.dataSource[index]
            a.status = 'Reviewed'
            this._router.navigate([`/${this.model}`, this.record._id, 'details'])
          },
          error: (err: HttpErrorResponse) => {
            const detail = this._errorHandler.getErrorMessage(err)
            context.errorMessage = detail
            this.openDialog(false, context);
          }
        }
      )
    )
  }

  openRecallApproval(id: string){
    const context = this._errorHandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
    'Form registered successfully.', 
    'We could not perform the action.'
    )

    this.subs.add(
      this._recordApprovalService.onRecallRecordApproval(id).subscribe(
        {
          next: res=>{
            const index = this.dataSource.findIndex(app => app.id === id)
            const a = this.dataSource[index]
            a.status = 'Recalled'
            this._router.navigate([`/${this.model}`, this.record._id, 'details'])
          },
          error: (err: HttpErrorResponse) => {
            const detail = this._errorHandler.getErrorMessage(err)
            context.errorMessage = detail
            this.openDialog(false, context);
          }
        }
      )
    )
  }

  getRecordApprovalRequests(data: any){
    this.subs.add(this._recordApprovalService.getRecordApprovalRequests(data).subscribe(
      res=>{this.dataSource = res
        this.ref.detectChanges()}
    ))
  }

  _openDialog(pk: number): void {
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {uuid: pk, model: 'approval-requests'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes'){
        this._recordApprovalService.deleteRecordApproval(pk).subscribe(
          res=>{
            let data = [...this.dataSource];
            data = data.filter((record: any) => record.id !== pk);
            this.dataSource = [...data]
            this._router.navigate([`/${this.model}`, this.record._id, 'details'])
          }
        );
        //console.log("Continue to deletion....");
      }else{
        return;
      }
    });
  }

  getClassForStatus(status: string): string{
    let status_class = ''
    if(status === 'Submitted'){
      status_class = 'submitted'
    }else if(['Recalled', 'Rejected'].includes(status)){
      status_class = 'danger'
    }else if(status==='Approved'){
      status_class = 'success'
    }else if(status==='Reviewed'){
      status_class = 'submitted'
    }
    return status_class
  }

}

