import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { DeleteConfirmComponent } from '../my-dialogs/dialogs/delete-confirm/delete-confirm.component';
import { RoutingService } from '../routing.service';
import { TaskDetailsComponent } from './dialogs/task-details/task-details.component';
import { TaskFormComponent } from './dialogs/task-form/task-form.component';
import { TasksService } from './tasks.service';
import { DATA_ENTRY_PATH_PREFIX } from 'src/settings/utilities/config';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit, OnDestroy {
  subs = new SubSink()
  @Input() record: any;
  @Input() model='';
  data: any = []

  @Input() hasPermissionAddTask= false
  @Input() hasPermissionEditTask= false
  @Input() hasPermissionDeleteTask= false
  @Input() hasPermissionViewTask = false

  displayedColumns = [
    'id',
    'status',
    'assigned_by',
    'due_date',
    'star',
  ];
  dataSource: any[] = []

  constructor(private _tasksService:TasksService, 
    private _routingService: RoutingService,
    private ref: ChangeDetectorRef,
    private _dialog: MatDialog) { }
  
    ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.data = {content_type: this.record.content_type, 
                  app_label: this.record.app_label, 
                  object_id: this.record.id}

    this.getRecordTasks(this.data);
    this.subs.add(this._tasksService.taskCreated.subscribe((res: any)=>{
      this.dataSource = [res, ...this.dataSource]
      this.ref.detectChanges()
    }))
  }

  onViewTaskDetails(uuid: string){
    this._routingService.onNavigateRecordDetails(DATA_ENTRY_PATH_PREFIX, 'tasks', uuid)
  }

  onViewApprovalDetails(id: string){
    const index = this.dataSource.findIndex(a=> a.id ===id)
    const ap = {...this.dataSource[index]}
    
    const dialogRef = this._dialog.open(TaskDetailsComponent, {
      width: '500px',
      data: ap,
    });

  }


  onOpenCreateTask(){
    const dialogRef = this._dialog.open(TaskFormComponent, {
      width: '500px',
      data: {...this.data, editMode: false},
    }); 

    dialogRef.afterClosed().subscribe((result: any) => {
        if(result){
          this.subs.add(
            this._tasksService.createTask(result.data).subscribe((res: any)=>{
              this.ref.detectChanges()
            })
          )
        }
    });
  }

  onUpdateRecord(data: any){
    const dialogRef = this._dialog.open(TaskFormComponent, {
      width: '500px',
      data: {...this.data, task: data, editMode: true},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        const uuid = data['_id']
        this.subs.add(
          this._tasksService.updateTask(uuid, result.data).subscribe((res: any)=>{
            const index = this.dataSource.findIndex((record: any) => record._id === uuid);
            this.dataSource.splice(index, 1)
            this.dataSource = [res, ... this.dataSource]
            this.ref.detectChanges()
          })
        )
      }
  });
  }


  getRecordTasks(data: any){
    this.subs.add(this._tasksService.getRecordTasks(data).subscribe(
      (res: any)=>{
        this.dataSource = res
        this.ref.detectChanges()
      }
    ))
  }

  openCompleteTask(uuid: any){
      const dialogRef = this._dialog.open(DeleteConfirmComponent, {
        width: '250px',
        data: {uuid: uuid, model: 'tasks'},
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if(result === 'yes'){
          this._tasksService.completeRecord(uuid, 'tasks').subscribe(
            (res: any)=>{
              const index = this.dataSource.findIndex((record: any) => record._id === uuid);
              this.dataSource[index].status = "completed"
              this.ref.detectChanges()
            }
          );
  
        }else{
          return;
        }
      });
  }

  putTaskInProgress(uuid: any){
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {uuid: uuid, model: 'tasks'},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result === 'yes'){
        this._tasksService.putRecordInProgress(uuid, 'tasks').subscribe(
          (res: any)=>{
            const index = this.dataSource.findIndex((record: any) => record._id === uuid);
            this.dataSource[index].status = "in progress"
            this.ref.detectChanges()
          }
        );

      }else{
        return;
      }
    });
}

  openDialog(uuid: number): void {
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {uuid: uuid, model: 'tasks'},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result === 'yes'){
        this._tasksService.deleteRecordTask(uuid).subscribe(
          (res: any)=>{
            let data = [...this.dataSource];
            data = data.filter((record: any) => record._id !== uuid);
            this.dataSource = [...data]
            this.ref.detectChanges()
          }
        );

      }else{
        return;
      }
    });
  }

  isInProgressAble(status: string){
    return ['not started', 'waiting on someone else', 'deffered',].includes(status)
  }

  isCompletable(status: string){
    return ['in progress'].includes(status)
  }

  isUpdatable(status: string){
    return !['completed'].includes(status)
  }

  getClassForStatus(status: string): string{
    let status_class = ''
    if(status === 'in progress'){
      status_class = 'submitted'
    }else if(['not started', 'deffered', 'waiting on someone else'].includes(status)){
      status_class = 'danger'
    }else if(status==='completed'){
      status_class = 'success'
    }
    return status_class
  }


}


