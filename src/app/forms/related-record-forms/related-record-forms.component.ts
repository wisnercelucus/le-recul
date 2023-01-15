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
  selector: 'app-related-record-forms',
  templateUrl: './related-record-forms.component.html',
  styleUrls: ['./related-record-forms.component.scss']
})
export class RelatedRecordFormsComponent implements OnInit {

  model = ''
  fields: ModelMetaField[] = [];
  targetField = ''
  targetFieldId!: number;

  permissionCodes: any[] = [];
  permissions: string[] = []
  lookups: any[] = [];
  adminCascade = false
  hiddenLookups: string[] = []
  isSaving = false

  normalizeTitle = normalizeTitle;
  getModelToQuery = getModelToQuery
  subs= new SubSink();
  uuid!: string;

  constructor(private _modelMetaService: ModelMetaService,
    public dialogRef: MatDialogRef<RelatedRecordFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _modelDataService: ModelDataService, 
    private _routingService: RoutingService,
    private _accountsService: AccountsService,
    private _errorHandler:ErrorHandlerService,
    private dialog: MatDialog) {
      //console.log(this.data)

      this.targetField = this.data.field
      this.adminCascade = this.data.adminCascade

      this.model = this.data.model
      this.targetFieldId = this.data.id
      this.hiddenLookups = this.data.hiddenLookups

      //console.log(this.data)

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
    }else if(this.model === 'trackindicators'){
      modelPost = "track-indicators"
    }else if(this.model === 'learningnotes'){
      modelPost = "learning-notes"
    }
    else{
      modelPost = this.model
    }

    //console.log(data)

    //return 

    this.isSaving = true

      this._modelDataService.doPost(modelPost, data).subscribe(
        {
          next: (data:any) =>{
            this.isSaving = false
            //const value = data.id + '|' + data.name + '|' + data._id
              this.dialogRef.close()
              this._routingService.onNavigateRecordDetails(DATA_ENTRY_PATH_PREFIX, modelPost, data._id)
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

    /*this.subs.add(
      this._modelDataService.getIndicatorDesaggregatedField(model, uuid).subscribe(
        res=> {}
      )
    )*/

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

  isTargetField(field: string): boolean{
    return field === this.targetField
  }

  inHiddenLookups(field: string){
    if(this.hiddenLookups && this.hiddenLookups.length){
      return this.hiddenLookups.includes(field)
    }
    return false
    
  }

  canDisplayNameField(model: string, field: string){
    if(field !== 'name'){
      return true
    }

    return !['track-indicators', 
              'stories', 
              'learning-notes', 
              'learningnotes', 
              'todos',
              'incidents'].includes(model)
  }



}
