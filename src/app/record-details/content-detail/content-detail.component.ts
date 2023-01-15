import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorHandlerService, OpenConfirmDialog } from 'src/app/error-handler.service';

import { DeleteConfirmComponent } from 'src/app/my-dialogs/dialogs/delete-confirm/delete-confirm.component';
import { GeneralConfirmComponent } from 'src/app/my-dialogs/dialogs/general-confirm/general-confirm.component';
import { RoutingService } from 'src/app/routing.service';
import { SubSink } from 'subsink';
import { RecordApprovalService } from '../services/record-approval.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ApprovalFormDialogComponent } from 'src/app/my-dialogs/dialogs/approval-form-dialog/approval-form-dialog.component';
import { DATA_ENTRY_PATH_PREFIX } from 'src/settings/utilities/config';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentDetailComponent implements OnInit, OnDestroy, OpenConfirmDialog {
  @Input() record!: any;
  @Input() model!: string;
  @Input() subs = new SubSink()
  @Input() hasEditPermission = false
  @Input() hasDeletePermission = false
  @Input() hasPermissionViewTask = false

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

  @Input() hasPermissionAddTask= false
  @Input() hasPermissionEditTask= false
  @Input() hasPermissionDeleteTask= false
  //@Input() hasPermissionViewTask = false


  record_meta!: {owner: {name: any, uuid: string, username: string}, updated_by: {name: string, uuid: string, username: string}, created_at: string|null, updated_at: string|null}

  constructor(private _utilitiesService:UtilitiesService,
    private _router: Router,
    private _dialog:MatDialog, 
    private _routingService:RoutingService,
    private _errorHandler:ErrorHandlerService,
    private ref: ChangeDetectorRef,
    private _recordApprovalService:RecordApprovalService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  openDialog(success:boolean, context: any){
    this._dialog.open(GeneralConfirmComponent,
      {data: this._errorHandler.getDialogContext(success, context)});
  }

  ngOnInit(): void {
    //console.log(this.hasDeletePermission)
    //console.log(this.hasEditPermission)


    this.record_meta = {owner: {name: this.record.owner?.name, 
                                uuid: this.record.owner?.uuid,
                                username: this.record.owner?.username,
                              },
                        updated_by: {name: this.record.updated_by?.name, 
                          uuid: this.record.updated_by?.uuid,
                          username: this.record.updated_by?.username,
                        },
                        updated_at: this._utilitiesService.formateDate(this.record.updated_at, 'short'),
                        created_at: this._utilitiesService.formateDate(this.record.created_at, 'short')
                        }

    this.getRecordApproval();

    this.subs.add(this._recordApprovalService.approvalCreated.subscribe(res=>{
      this.record['approval'] = res
      this.ref.detectChanges()
    }))

    

  }

  getRecordApproval(){
    this.subs.add(this._recordApprovalService.onGetRecordApproval(
      this.record._id, this.record.content_type, this.record.app_label
    ).subscribe(
      {
        next: res=> {this.record['approval'] = res
        this.ref.detectChanges()
      },
        error: err=> {}
      }
    ))
  }

  
  onApprove(pk: number){
    const context = this._errorHandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
    'Form registered successfully.', 
    'We could not perform the action.'
    )

    this._recordApprovalService.onApproveRecordApproval(pk).subscribe(
      {
        next: (res: any)=>{
          this.record.approval.status = "Approved"
          this._router.navigate([`/${this.model}`, this.record._id, 'details'])
          //this.ref.detectChanges()

        },
        error: (err: HttpErrorResponse) => {
          const detail = this._errorHandler.getErrorMessage(err)
          context.errorMessage = detail
          this.openDialog(false, context);
        }
      }

    );
  }

  onReject(pk: number): void {
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {uuid: pk, model: 'approvals'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes'){

        const dialogRef_ = this._dialog.open(ApprovalFormDialogComponent, {
          width: '500px',
          data: {record: this.record, submission_mode: false, pk: pk}
        });

        dialogRef_.afterClosed()
        .subscribe(result => {
          //console.log(result)
          if(result === 'yes'){
            this._router.navigate([`/${this.model}`, this.record._id, 'details'])
          }
        });

        
      }else{
        return;
      }
    });
  }

  openApprovalDialog(record: any, mode?: boolean){
    const dialogRef = this._dialog.open(ApprovalFormDialogComponent, {
      width: '500px',
      data: {record: record, submission_mode: mode}
    });
    
  }

  supportApprovalProcess(model: string): boolean{
    const ExemptFetchApproval = ['tasks', 'approval-requests', 'todos',]
    return !ExemptFetchApproval.includes(model)
  }

  canFetchTasks(model: string): boolean{
    const ExemptFetchApproval = ['tasks', 'todos',]
    return !ExemptFetchApproval.includes(model)
  }

  getValuesFor(item: any){
    return [...item.value]
  }



  getFrontRootFromModel(name: string){
    if(name.endsWith('y')){
      return name.slice(0, name.length -1) + 'ies'

    }else if(name === 'trackindicator'){
      return 'track-indicators'
    }
    else{
      return name + 's'
    }

    return ''
  }

  getLookupNameFrom(name: string){
    if(name.endsWith('y')){
      return name.slice(0, name.length -1) + 'ies'

    }else{
      return name + 's'
    }

    return ''
  }

  getLookupsNormalName(name: string){
    if(name.endsWith('y')){
      return name.slice(0, name.length -1) + 'ies'
    }else{
      return name + 's'
    }

    return ''
  }


  navigateLookupDetails(value: any, _id: string){
    if(!value) return;

    const frontend_root = this.getFrontRootFromModel(value.model.name)
    this._routingService.onNavigateRecordDetails(DATA_ENTRY_PATH_PREFIX, frontend_root, _id)
    
  }

  navigateTo(model: string, _id: string, lookup_name: string){
    lookup_name = this.getLookupNameFrom(lookup_name)

    this._routingService.onNavigateRecordLooups(DATA_ENTRY_PATH_PREFIX, model, _id, lookup_name)
  }

}
