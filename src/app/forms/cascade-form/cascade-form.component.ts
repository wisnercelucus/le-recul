import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralConfirmComponent } from 'src/app/my-dialogs/dialogs/general-confirm/general-confirm.component';
import { RoutingService } from 'src/app/routing.service';
import { SubSink } from 'subsink';
import { ModelDataService } from '../services/model-data.service';
import { ModelMetaField, ModelMetaService } from '../services/model-meta.service';
import { getModelToQuery, normalizeTitle } from 'src/settings/utilities/functions';
import { ErrorHandlerService } from 'src/app/error-handler.service';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { DATA_ENTRY_PATH_PREFIX } from 'src/settings/utilities/config';

@Component({
  selector: 'app-cascade-form',
  templateUrl: './cascade-form.component.html',
  styleUrls: ['./cascade-form.component.scss']
})
export class CascadeFormComponent implements OnInit {
  model = 'program'
  fields: ModelMetaField[] = [];

  permissionCodes: any[] = [];
  permissions: string[] = []
  lookups: any[] = [];
  adminCascade = false
  isSaving = false

  normalizeTitle = normalizeTitle;
  getModelToQuery = getModelToQuery
  subs= new SubSink();
  uuid!: string;
  DATA_ENTRY_PREFIX_PATH = DATA_ENTRY_PATH_PREFIX
  constructor(private _modelMetaService: ModelMetaService,
    public dialogRef: MatDialogRef<CascadeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _modelDataService: ModelDataService, 
    private _routingService: RoutingService,
    private _accountsService: AccountsService,
    private _errorHandler:ErrorHandlerService,
    private dialog: MatDialog) {

      const name = this.data.field.name
      this.adminCascade = this.data.adminCascade

      if(name === 'parent'){
        this.model = this.getModelFromField(this.data.field.related_model)
      }else{
        this.model = this.getModelFromField(name)
      }
     
      const modelToQuery = this.getModelToQuery(this.model);
      this.subs.add(  
          this._modelMetaService.getModelFields(modelToQuery).subscribe(
          (data: {fields: ModelMetaField[]} | any) => {
          this.fields = data.fields
          }
        )
        )

  }

  openDialog(success:boolean, context: any){
    this.dialog.open(GeneralConfirmComponent,
      {data: this._errorHandler.getDialogContext(success, context)});
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {

    this.subs.add(
      this._accountsService.userPermissionsCodes.subscribe(
        res=> {
          if(res){
            for(let r of res!){
              this.permissionCodes.push({app_label: r.split('.')[0], codename: r.split('.')[1]})
              this.permissions.push(r.split('.')[1])
            }
          }
          
        }
        
      )
    )


  }

  onSubmit(f: NgForm){
    const data = f.value;

    if(this.lookups.length){
      for(let lookup of this.lookups){
        data[lookup.name] = lookup.value
      }
    }

    const context = this._errorHandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
    'Thank you for your account request. Please visit your email to confirm your identity.', 
    'We could not save your data. Please retry.'
    )

    let modelPost = ''

    if(this.model === 'userprofiles'){
      modelPost = "accounts"
    }else{
      modelPost = this.model
    }

    this.isSaving = true
      this._modelDataService.doPost(modelPost, data).subscribe(
        {
          next: (data:any) =>{
            this.isSaving = false
            const value = data.id + '|' + data.name + '|' + data._id
              this.dialogRef.close(value)
          },
          error: (err: HttpErrorResponse) => {
            this.isSaving = false
            const detail = this._errorHandler.getErrorMessage(err)
            context.errorMessage = detail
            this.openDialog(false, context);
          }
        }

      )
    

  }



  getInputValue(record: any, field: string): string{
    let unputValue = ''
    if(!record){
      return unputValue
    }

    const value = record[field]

    if(!value){
      return unputValue
    }

    //console.log(record[field])

    if (typeof value === 'object'){
      unputValue = value.id + '|' + value.name + '|' + value.uuid
    }else{
      return unputValue
    }

    return unputValue
  }


  getValue(record: any, field: string){
    if(!record){
      return
    }

    const value = record[field]

    if(!value){
      return ''
    }


    if (typeof value === 'object'){
      return value.id
    }

    return record[field]
  }

  onNavigateRecordDetails(uuid: string): void{
    const model = this.model;
    this._routingService.onNavigateRecordDetails(DATA_ENTRY_PATH_PREFIX, model, uuid);
  }

  has_permission(action: string, model: string){
    model = this.getModelToQuery(model)
    const perm = `${action}_${model}`
    //this.permissions.includes(perm)
    return this.permissions.includes(perm)
  }

  getIndicatorDisaggregatedField(model: string, uuid: string){
    if(model !== 'track-indicators'){
      return
    }

    this.subs.add(
      /*this._modelDataService.getIndicatorDesaggregatedField(model, uuid).subscribe(
        res=> {}
      )*/
    )

  }

  onLookupSelected(e: any){
    const index = this.lookups.findIndex(l => l.name === e.name)
    if(index !== -1 ){
      const lookup = this.lookups[index]
      if(e.value === null){
        this.lookups.splice(index, 1);
      }else if(e.value !== lookup.value){
        this.lookups[index] = e
      }
      //console.log(this.lookups)
      return
    }

    this.lookups.push(e)
    //console.log(this.lookups)
  }

  cancel(){
    this.dialogRef.close()
  }

  getModelFromField(fieldName: string, adminCascade? : boolean): string{
    if(!fieldName) return ''

    if(fieldName === 'activity'){
      return 'activities'
    }

    if(fieldName === 'institution_type'){
      return 'institution-types'
    }

    if(fieldName === 'category'){
      return 'categories'
    }

    if(fieldName === 'community'){
      return 'communities'
    }

    if(fieldName === 'tertiary_area'){
      return 'tertiaryareas'
    }

    if(fieldName === 'secondary_area'){
      return 'secondaryareas'
    }
    
    if(fieldName === 'primary_area'){
      return 'primaryareas'
    }

    if(fieldName === 'disaggregation_option'){
      return 'disaggregationoptions'
    }


    

    if(['manager', 'approver'].includes(fieldName)){
      return 'userprofiles'
    }

    return fieldName + 's'

  }

  canDisplayNameField(model: string, field: string){
    if(field !== 'name'){
      return true
    }

    return !['track-indicators', 
              'stories', 'learning-notes', 
              'todos',
              'incidents'].includes(model)
  }


}
