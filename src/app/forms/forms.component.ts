import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModelMetaService } from './services/model-meta.service';
import { SubSink } from 'subsink';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { getModelToQuery, normalizeTitle } from 'src/settings/utilities/functions';
import { NgForm } from '@angular/forms';

export interface LookupModel{
  id: number;
  name: string;
  _id: string
}

export interface ModelMetaField{
  name: string;
  description: string;
  choices?: string[];
  related_model?: string;
  max_length? : number;
  is_required: boolean;
  lookups?: LookupModel[]
}


@Component({
  selector: 'vn-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy {
  subs = new SubSink()
  getModelToQuery = getModelToQuery
  editMode = false
  model: string = ''
  isLoadingResults = false
  fields: any[] = []
  lookups: any[] = [];
  permissions: any[] = []
  //isLoadingResults = true
  isSaving = false
  fileSelected: any;
  normalizeTitle = normalizeTitle
  record: any;

  constructor(private _modelMetaService: ModelMetaService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };


    this.model = this.getModelFromRoot()!;

    if(this.model){
      const modelToQuery = this.getModelToQuery(this.model)
      this.getModelField( modelToQuery)
    }

  }

  getModelFromRoot(): string|null {
    const route = this._route.snapshot.paramMap.get('model');
    return route
  }

  getModelField(model: string): void{
    this.subs.add(
      this._modelMetaService.getModelFields(model).subscribe({
        next: (data: any)=>{
          console.log(data)
          this.fields = data.fields
        },
        error: (err: HttpErrorResponse)=>{
          console.log(err)
        }
      })
    )
  }


  onSubmit(f: NgForm){
    /*
    let data = {...f.value};
    //console.log(data)

    if(this.lookups.length){
      for(let lookup of this.lookups){
        data[lookup.name] = lookup.value
      }
    }

    let dataToSave: any;

    if(this.fileSelected){
      dataToSave = new FormData()
      if(this.fileSelected.image){
        dataToSave.append(this.fileSelected.field, this.fileSelected.image, this.fileSelected.image.name)
      }
      
      for(let key of Object.keys(data)){
        dataToSave.append(key, data[key])
      }
    }

    if(dataToSave){
      data = dataToSave
    }

    const context = this._errorHandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
      'Thank you for your account request. Please visit your email to confirm your identity.', 
      'We could not save your data. Please retry.'
    )

    this.isSaving = true
    if(this.editMode){
      this._modelDataService.doPut(this.model, this.uuid, data).subscribe(
        {
          next: (data: any)=> {
            this.isSaving = false
            this.onNavigateRecordDetails(this.uuid)
          },
          error: (err: HttpErrorResponse) => {
            this.isSaving = false
            const detail = this._errorHandler.getErrorMessage(err)
            context.errorMessage = detail
            this.openDialog(false, context);
          }
        }
        //data => this.onNavigateRecordDetails(this.uuid)
      )
    }else{
      this._modelDataService.doPost(this.model, data).subscribe(
        {
          next: (data:any) =>{
              this.onNavigateRecordDetails(data['uuid'])
          },
          error: (err: HttpErrorResponse) => {
            const detail = this._errorHandler.getErrorMessage(err)
            context.errorMessage = detail
            this.openDialog(false, context);
          }
        }

      )
    }

    */

  }

  getObjectToUpdate(uuid: string): void{
    /*this.subs.add(
      this._modelDataService.getObjectToUpdate(this.model, uuid).subscribe(record=> this.record = record)
    )*/
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
    //this._routingService.onNavigateRecordDetails(model, uuid);
  }



  has_permission(action: string, model: string){
    model = this.getModelToQuery(model)
    const perm = `${action}_${model}`
    //this.permissions.includes(perm)

    return true//this.permissions.includes(perm)
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
    if(index >=0 ){
      const lookup = this.lookups[index]
     /* if(!e.value){
        this.lookups.splice(index, 1);
        this.lookups.push(e)
        //return
      }else */
      
      if(e.value !== lookup.value){
        this.lookups[index] = e
        //return
      }
      //console.log(this.lookups)
      return
    }

    this.lookups.push(e)
    //console.log(this.lookups)
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


  onImageSelected(e: any, field: string){
    if(e && e.length){
      this.fileSelected = {field, image: e[0]}
    }
    else{
      this.fileSelected=null
    }
    
  }



}