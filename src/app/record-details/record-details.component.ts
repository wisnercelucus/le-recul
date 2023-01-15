import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { startWith, switchMap } from 'rxjs';
import { SubSink } from 'subsink';
import { RecordDetailsService } from './services/record-details.service';
import { getModelToQuery } from 'src/settings/utilities/functions';
import { ModelMetaService } from '../forms/services/model-meta.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.scss']
})
export class RecordDetailsComponent implements OnInit, OnDestroy {
  meta_data!: {object_id: number, uuid: string, content_type: string, app_label:string};
  modelManyToManyFields: any;
  inputData: any;
  disagration_data: any;
  isLoadingResults = false

  subs = new SubSink();
  record_id!: string;
  model!: string;
  record!: any;

  permissionCodes: any[] = [];
  permissions: string[] = []

  getModelToQuery = getModelToQuery

  constructor(private _recordDetailsService: RecordDetailsService, 
    private _route: ActivatedRoute,
    private _router:Router,
    private _modelMetaField: ModelMetaService,
    private _utilitiesService: UtilitiesService) { }

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
       //this.getModelField( modelToQuery)
     }

    this.record_id = this._route.snapshot.paramMap.get('model_uuid')!;
    //console.log(this.record_id)
    this.subs.add(
      this._utilitiesService.modelToFilter.pipe(
        startWith(''),
        switchMap((model: string)=> {
          this.isLoadingResults = true
          return this._recordDetailsService.getRecordDetail(this.model, this.record_id)
        })
      ).subscribe(
        {
          next:  (data: any) => {
            this.record = data
            this.meta_data = {content_type: this.record.content_type, uuid: this.record_id, object_id: this.record.id, app_label: this.record.app_label}
            let modelToQuery = this.getModelToQuery(this.model);
            //console.log(modelToQuery)
            if(modelToQuery === 'sector'){
              modelToQuery = 'developmentsector'
            }
            if(modelToQuery === 'role'){
              modelToQuery = 'userrole'
            }
            this.isLoadingResults = false
    
            this._modelMetaField.getModelManyToManyFields(modelToQuery).subscribe(
              (res: any) => {
                //console.log(res.fields)
                this.modelManyToManyFields = res.fields
                this.getIndicatorDisaggregatedField(this.model, this.record_id )
              })
            }
            ,error: (err:HttpErrorResponse)=>{
              this.isLoadingResults = false
            }
                 
        }
        
        )
    )

    //this.getUserPermissionCodes()

    /*this.subs.add(
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
    )*/
  }


  getModelFromRoot(): string|null {
    const route = this._route.snapshot.paramMap.get('model');
    return route
  }

  canFetchGeography(model: string){
    return ['programs', 'projects', 'activities', 'partners'].includes(model)
  }

  canFetchForms(model: string): boolean{
    const ExemptFetchFormList = ['forms', 
                                  'tasks', 
                                  'accounts', 
                                  'disaggregationoptions',
                                  'disaggregationoptionfields',
                                  'postions',
                                  'roles',
                                  'todos',
                                  'incident-categories', 
                                  'permissions',]
    return !ExemptFetchFormList.includes(model)
    //model !== 'forms' &&  model !== 'partners' &&  model !== 'accounts'"
  }

  formatFieldName(field: string){
    const fieldCapitilized = field.charAt(0).toUpperCase() + field.slice(1);
    field = fieldCapitilized.split('_').join(' ')
    return field
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
        res=> {
          this.disagration_data = res
          //console.log(this.disagration_data)
        }
      )
    )*/
  }








}
