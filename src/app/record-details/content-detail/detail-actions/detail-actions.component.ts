import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, startWith, switchMap } from 'rxjs';
import { DataTablesService } from 'src/app/data-tables/data-tables.service';
import { RelatedRecordFormsComponent } from 'src/app/forms/related-record-forms/related-record-forms.component';

import { ApprovalFormDialogComponent } from 'src/app/my-dialogs/dialogs/approval-form-dialog/approval-form-dialog.component';
import { DeleteConfirmComponent } from 'src/app/my-dialogs/dialogs/delete-confirm/delete-confirm.component';
import { RoutingService } from 'src/app/routing.service';
import { TasksService } from 'src/app/tasks/tasks.service';
import { DATA_ENTRY_PATH_PREFIX } from 'src/settings/utilities/config';

@Component({
  selector: 'app-detail-actions',
  templateUrl: './detail-actions.component.html',
  styleUrls: ['./detail-actions.component.scss']
})
export class DetailActionsComponent implements OnInit {
  @Input() model!: string;
  @Input() record_id!: string;
  @Input() record: any;
  @Output() rejectRecord = new EventEmitter();  
  @Output() approveRecord = new EventEmitter();  
  @Input() hasEditPermission = false
  @Input() hasDeletePermission = false
  panelOpenState = false;

  @Input() hasPermissionApproveApproval = false
  @Input() hasPermissionApproveRecord = false
  @Input() hasPermissionViewApprovalRequests = false
  @Input() hasPermissionRejectApprovalRequests = false
  @Input() hasPermissionSubmitApprovalRequests = false
  @Input() hasPermissionRecallApprovalRequests = false
  @Input() hasPermissionDeleteApprovalRequests = false
  @Input() hasPermissionAddApprovalRequests = false
  @Input() hasPermissionEditApprovalRequests = false
  
  constructor(private _dataService:DataTablesService,
    private _tasksService: TasksService,
    public dialog: MatDialog,
    private _routingService: RoutingService,) { }

  ngOnInit(): void {
    //console.log(this.record)
    //console.log(this.hasEditPermission)
    //console.log(this.hasDeletePermission)
  }


  onEditRecord(uuid: any): void{
    const model = this.model;
    if(['accounts', 'roles', 'permissions', 'positions'].includes(model)){
      this._routingService.onEditRecordInAdmin(model, uuid);
    }else{
      this._routingService.onEditRecord(DATA_ENTRY_PATH_PREFIX, model, uuid);
    }
    
  }

  onCollectData(uuid: any): void{
    const model = this.model;
    this._routingService.onCollectData(model, uuid);
  }

  openApprovalDialog(record: any){
    const dialogRef = this.dialog.open(ApprovalFormDialogComponent, {
      width: '500px',
      data: {record: record, 
        front_root_path: this.model,
        submission_mode: true}
    });
    
  }


  openDialog(uuid: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {uuid: uuid, model: this.model, submission_mode: true},
    });

    dialogRef.afterClosed().pipe(
      startWith(null),
      switchMap((result: any)=>{
        if(result === 'yes'){
          this._dataService.deleteData(this.model, uuid).subscribe(
            (res: any)=>{
              if(this.model === 'accounts'){
                this._routingService.onNavigateToSdminTable(this.model);
              }else{
                this._routingService.onNavigateToModel(this.model);
              }
            }
          )
          return of(null)
        }else{
          return of(null)
        }
      })
    ).subscribe((result: any) => {
      
    });
  }

  canBeApprovedOrRjected(approval: any){
    return approval.status === 'Submitted' || approval.status === 'Reviewed'
  }

  isApproved(approval: any, action?: string){
    if(action && !approval){
      return false
    }
    return approval.status === 'Approved'
  }

  isSubmitted(approval: any){
    if(!approval){
      return false
    }
    
    return approval.status === 'Submitted'
  }

  isReviewed(approval: any){
    if(!approval){
      return false
    }
    return approval.status === 'Reviewed'
  }



  onApproveRecord(id: number){
    this.approveRecord.emit(id)
  }

  onRejectRecord(id: number){
    this.rejectRecord.emit(id)
  }

  supportApprovalProcess(model: string): boolean{
    const ExemptFetchApproval = ['tasks', 'approvals', 'approval-requests', 'todos',]
    return !ExemptFetchApproval.includes(model)
  }

  canFetchTasks(model: string): boolean{
    const ExemptFetchApproval = ['tasks', 'todos',]
    return !ExemptFetchApproval.includes(model)
  }

  ifIsTaskTasks(model: string){
    return ['tasks', 'approvals', 'approval-requests',].includes(model)
  }

  ifSupportStatus(model: string){
    return ['tasks', 'approvals', 'approval-requests', 'todos',].includes(model)
  }

  ifSupportRelatedOpbject(model: string){
    return ['tasks', 'approvals', 'approval-requests',].includes(model)
  }

  onNavigateToTaskRelatedObject(record: any){
    let model = record.related_to.model
    //console.log(model)

    if(model === 'activity' ){
      model = 'activities'
    }else if(model === 'user profile'){
      model = 'accounts'
    }else if(['primary_area', 'primary area'].includes(model)){
      model = 'primaryareas'
    }else if(['secondary_area', 'secondary area'].includes(model)){
      model = 'secondaryareas'
    }else if(['tertiary_area', 'tertiary area'].includes(model)){
      model = 'tertiaryareas'
    }else if(model === 'community'){
      model = 'communities'
    }else if(model === 'approval'){
      model = 'approval-requests'
    }

    
    else{
      model = model + 's'
    }

    this._routingService.onNavigateRecordDetails(DATA_ENTRY_PATH_PREFIX, model, record.related_to.uuid)
  }

  isInProgressAble(status: string){
    return ['not started', 'waiting on someone else', 'deffered',].includes(status)
  }

  isCompletable(status: string){
    return ['in progress'].includes(status)
  }



  openCompleteTask(uuid: any){
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {uuid: uuid, model: this.model},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result === 'yes'){
        this._tasksService.completeRecord(uuid, this.model).subscribe(
          (res: any)=>{
            this._routingService.onNavigateRecordDetails(DATA_ENTRY_PATH_PREFIX, this.model, uuid)
          }
        );

      }else{
        return;
      }
    });
}

putTaskInProgress(uuid: any){
  const dialogRef = this.dialog.open(DeleteConfirmComponent, {
    width: '250px',
    data: {uuid: uuid, model: this.model},
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    if(result === 'yes'){
      this._tasksService.putRecordInProgress(uuid, this.model).subscribe(
        (res: any)=>{
          this._routingService.onNavigateRecordDetails(DATA_ENTRY_PATH_PREFIX, this.model, uuid)
        }
      );

    }else{
      return;
    }
  });
}

formatStatus(status: string){
  return status.charAt(0).toUpperCase() + status.slice(1);
}

onAddRelatedForm(field:any, model: string, id: number, hide_links: string[]){
  const dialogRef = this.dialog.open(RelatedRecordFormsComponent, {
    disableClose: true,
    width: '500px',
    data:  {model: model, field: field, id: id, hiddenLookups: hide_links}
  })

  dialogRef.afterClosed().subscribe((result: any) => {
    if(result){
      //console.log(result)
    }else{
      return;
    }
  });
}

}
