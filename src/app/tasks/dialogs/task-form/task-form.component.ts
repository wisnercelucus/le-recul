import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { TasksService } from '../../tasks.service';
import { FormsService } from 'src/app/forms/services/formsServices';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  @Input() object_id: number | undefined;
  @Input() content_type:string | undefined;
  @Input() app_label: string | undefined; 
  @Input() task: any;
  editMode = false;
  
  content_object:string | undefined;

  subs = new SubSink()
  priorities:string[] = ['high', 'normal', 'low'];

  statuses:{name: string, value: string}[] = [{name:'Not started', 
                        value:'not started'},  
                        {name: 'In progress', value: 'in progress'}, 
                        {name: 'Completed', value:'completed'}, 
                        {name: 'Waiting on someone else', value: 'waiting on someone else'}, 
                        {name: 'Deffered', value: 'deffered'}
                      ];


  reminder_frequencies:{name: string, value: string}[] = [
                    {name:'Every day', value:'every day'},  
                    {name: 'A day before deadline', value: 'a day before deadline'},
                    {name:'15 minutes before deadline', value:'15 minutes before deadline'},  
                    {name: '30 minutes before deadline', value: '30 minutes before deadline'},
                    {name: '1 hour before deadline', value: '1 hour before deadline'},
                  ];


  assign_to_users = new FormControl()
  assign_to_users_list: any[]=[];

  constructor(private _formLookups: FormsService,
    private _taskService: TasksService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    ) { 
      
      this.dialogRef.disableClose = true;
      this.content_type = this.data.content_type;
      this.object_id = this.data.object_id;
      this.app_label = this.data.app_label;
      this.editMode = this.data.editMode;

      this.getusersList({app_label: 'accounts', content_type: 'user'});

      if(this.editMode){
        this.task = this.data.task;
      }
    }

  ngOnInit(): void {
    
    if(this.task){
      this.assign_to_users.setValue(this.task.assigned_to);
    }

    
  }

  getusersList(data: any){
    this.subs.add(
      this._formLookups.onFetchFormLookups('forms', data).subscribe(
        (res: any)=> this.assign_to_users_list = res
      )
    )
  }

  onSubmit(f:NgForm){

    let data = f.value;
    data['assigned_to'] = this.assign_to_users.value;
    data['object_id'] = this.object_id;
    data['content_type'] = this.content_type;

    this.dialogRef.close({editMode: this.editMode, data});

  }

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();
    return (date === 1 || date === 20) ? 'custom-date-class' : '';
  }

  onUpdateTask(f:NgForm){
    let data = f.value;
    data['assigned_to'] = this.assign_to_users.value;

  }


  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }

  close(){
    this.dialogRef.close();
  }


}
