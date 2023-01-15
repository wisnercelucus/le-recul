import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModelMetaField } from 'src/app/forms/forms.component';
import { RoutingService } from 'src/app/routing.service';
import { DATA_ENTRY_PATH_PREFIX } from 'src/settings/utilities/config';
import { normalizeTitle } from 'src/settings/utilities/functions';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-flex-detail',
  templateUrl: './flex-detail.component.html',
  styleUrls: ['./flex-detail.component.scss']
})
export class FlexDetailComponent implements OnInit, OnDestroy {
  @Input() record!: any;
  @Input() model!: string;
  fieldVelues: any[] = [];
  subs = new SubSink();

  fields: ModelMetaField[] = [];

  normalizeTitle = normalizeTitle;


  constructor(private _routingService: RoutingService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    //console.log(this.record)
    //this.constructFieldvalueList(this.record)
    //console.log(this.record.toArray())

    //const modelToQuery = this.getModelToQuery(this.model);

    /*this.subs.add(
      this._modelMetaService.getModelFieldsForDetails(modelToQuery).subscribe(
      (data: {fields: ModelMetaField[]} | any) => {
      this.fields = data.fields
      console.log(this.fields)
      }
    ))*/

  }

  constructFieldvalueList(record: any): void{
    for(let k of Object.keys(record)){
      const field: any = {};
      field[k] = record[k]
      this.fieldVelues.push(field)
    }
  }

  fieldIsDisplayaBle(key: any){
    const NOT_DISPLAYABLE_FIELDS = ['owner', 
    'updated_by', 
    'updated_at', 
    'created_at', 
    'id', 
    'app_label',
    'content_type',
    'categories',
    'forms',
    'related_to_add',
    'user_permissions',
    'frontend_views',
    'lookups',
  ]
    return !NOT_DISPLAYABLE_FIELDS.includes(key)
  }

  getModelToQuery(model: string): string{
    if(model === 'activities'){
      model = 'activity';
    }else{
      model = model.split('-').join('').slice(0, -1);
    }
    return model;
  }


  getValue(record: any, field: string){
    if(!record){
      return
    }

    return record[field]
  }

  valueIsObject(value: any): boolean {
    if(!value){
      return false
    }
    return typeof(value) === 'object'
  }

  supportNavigation(value: any, key: any){
    if(!value){
      return false
    }

    if(key === 'lookups'){
      return false
    }
    
    return (value.frontend_root !== null && value.frontend_root !== undefined)
  }


  isLookups(value: any){

    if(!value){
      return false
    }

    console.log(value)

    return value.key === 'lookups'
  }

  getValuesFor(item: any){
    return [...item.value]
  }

  getDisplayLabel(value: any){
    if(value && value.name){
      return value.name
    }else if(value && value._id){
      return value._id
    }

    return value
  }

  getFrontRootFromModel(name: string){
    if(name.endsWith('y')){

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

  navigateTo(value: any){
    if(!value) return;

    if(value && value.in_admin){
      this._routingService.onNavigateRecordAdminDetails(DATA_ENTRY_PATH_PREFIX, value.frontend_root, value._id)
    }else if(value.frontend_root === 'accounts' && value.username){
      this._routingService.onNavigateToUserProfile(value.frontend_root, value.username)
    }else{
      this._routingService.onNavigateRecordDetails(DATA_ENTRY_PATH_PREFIX, value.frontend_root, value._id)
    }
    
  }

  notRichText(key: any){
    return ['description', 
      'definition', 
      'detail', 
      'comment', 
      'goal', 
      'content',
      'excerpt',
      'what_happened',
      'what_went_well',
      'what_can_we_learn_from_this',
      'narrative',].includes(key)
  }

  getString(value: any): string{
    if (value){
      return value.toString()
    }
    return ''
    
  }

  valueIsLink(value: any){
    if(!value) return false

    if(typeof(value) === 'string'){
      const splits = value.split('://')
      return ['http', 'https'].includes(splits[0])
    }
  
    return false
  }



}
