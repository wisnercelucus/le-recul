import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RecordDetailsService } from '../services/record-details.service';
import { SubSink } from 'subsink';
import { AdminService } from 'src/app/admin/admin.service';


@Component({
  selector: 'app-many-to-many-forms',
  templateUrl: './many-to-many-forms.component.html',
  styleUrls: ['./many-to-many-forms.component.scss']
})
export class ManyToManyFormsComponent implements OnInit, OnDestroy {
  @Input() meta_data!: {object_id: number, content_type: string, app_label:string};
  @Input() field!: string;

  permissions!: any[];
  frontend_views!: any[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  recordCtrl = new FormControl('');
  filteredRecords: Observable<string[]>;
  records: string[] = [];
  allRecords: string[] = [];
  subs = new SubSink()
  @Input() record: any;

  @ViewChild('recordInput') recordInput!: ElementRef<HTMLInputElement>;

  constructor(private _recordDetailsService: RecordDetailsService,
    private _adminService: AdminService
    ) {
    this.filteredRecords = this.recordCtrl.valueChanges.pipe(
      startWith(null),
      map((record: string | null) => (record ? this._filter(record) : this.allRecords.slice())),
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  ngOnInit(): void {
    const data = {content_type: this.meta_data.content_type, 
                field: this.field, 
                app_label: this.meta_data.app_label}
    this.getRecordsTofilter(this.field, data);
    this.getRecordManyToMany();

    if(this.canEditPermission(this.field)){
      this.getObjectPermissions()
    }

    if(this.canEditFrontEndViews(this.field)){
      this.getObjectFrontEndViews()
    }

    //console.log(this.record)
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.records.push(value);
    }

    event.chipInput!.clear();
    this.recordCtrl.setValue(null);
  }

  remove(record: string): void {
    const index = this.records.indexOf(record);
    if (index >= 0) {
      this.records.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue
    if(!this.records.includes(value))
      this.records.push(value);
    this.recordInput.nativeElement.value = '';
    this.recordCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRecords.filter(record => record.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    const data: any = {};
    const recordsselected = []
    for(let record of this.records){
      recordsselected.push(+record.split('|')[0])
    }

    data['records'] = recordsselected;
    data['content_type'] = this.meta_data.content_type;
    data['object_id'] = this.meta_data.object_id;
    data['app_label'] = this.meta_data.app_label;
    data['field'] = this.field;

    this.subs.add(
      this._recordDetailsService.recordModelManyToManyData(data).subscribe(res=>{
        //console.log(res)
        this._recordDetailsService.emitNewManyData(res)
      })
    )
  }

  onSubmitPermission(f: NgForm){
    const data = f.value
    data['content_type'] = this.meta_data.content_type;
    data['object_id'] = this.meta_data.object_id;
    data['app_label'] = this.meta_data.app_label;

    this.subs.add(
      this._adminService.saveObjectPermissions('permissions', data).subscribe(
        res=>{
          //console.log(res)
          this._recordDetailsService.emitNewManyData(res)
        }
      )
    )
  }

  onSubmitFrontEndViews(f: NgForm){
    const data = f.value
    data['content_type'] = this.meta_data.content_type;
    data['object_id'] = this.meta_data.object_id;
    data['app_label'] = this.meta_data.app_label;

    this.subs.add(
      this._adminService.saveObjectPermissions('frontend-views', data).subscribe(
        res=>{
          //console.log(res)
          this._recordDetailsService.emitNewManyData(res)
        }
      )
    )
  }

  getRecordsTofilter(field: string, data: any){
    this._recordDetailsService.getRecordManyToManydata(field, data).subscribe(res=>{
      for(let r of res){
        //sconsole.log(r)
        const name = r.name
        const pk = r.id
        this.allRecords.push(pk + '|' + name)
      }
    })
  }

  canEditPermission(field: string){
    return ['user_permissions', 'permissions'].includes(field)
  }

  canEditFrontEndViews(field: string){
    return ['frontend_views',].includes(field)
  }

  getSelectedOption(permissions: number[], perm_id: number): boolean{
    if(permissions){
      return permissions.includes(perm_id)
    }
    return false
    
  }


  getRecordManyToMany(){
    const data_: any = {}
    data_['content_type'] = this.meta_data.content_type;
    data_['object_id'] = this.meta_data.object_id;
    data_['app_label'] = this.meta_data.app_label;
    data_['field'] = this.field;
    this.subs.add(
      this._recordDetailsService.getModelManyToManyData(data_).subscribe(res=>{
        
        for(let r of res){
          const name = r.name
          const pk = r.id
          this.records.push(pk + '|' + name)
        }

      })
    )
    
  }

  groupBy(list: any[], keyGetter: any){
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item)
      const collection = map.get(key)
      if(!collection){
        map.set(key, [item])
      }else{
        collection.push(item)
      }
    })
    return map
  }



  getObjectPermissions(){
    this.subs.add(
      this._adminService.getObjectsPermissions('permissions').subscribe(
        res=> {
          const permissions: any[] = []
          const results: any[] = res
          const grouped = this.groupBy(results, (per: any) => per.content_type__app_label)
          for(let m of grouped){
            let perm_object: {app_label: string, 
                                models: {name: string, 
                                  permissions: any[]}[]} = 
                                  {app_label: '', models: [{name: '', permissions: []}]};
            const sub_grouped = this.groupBy(m[1], (item: any) => item.content_type__model)
            perm_object.app_label = m[0]
            for(let su of sub_grouped){
              perm_object.models.push({name: su[0], permissions: su[1]})
            }
            permissions.push(perm_object)
          }
          this.permissions = permissions
        }
      )
    )
  }


  getObjectFrontEndViews(){
    this.subs.add(
      this._adminService.getObjectsFrontendViews('frontend-views').subscribe(
        res=> {
          const views: any[] = []
          const results: any[] = res
          const grouped = this.groupBy(results, (view: any) => view.tab)
          for(let m of grouped){

            let view_object: {tab: string, 
                                links: {name: string, 
                                  tab: string, codename: 
                                               string, 
                                               has_link: boolean, 
                                               root_link: string}[]} = 
                                  {tab: '', links: 
                                                 [{name: '', codename: '', 
                                                 has_link: false, 
                                                 root_link: '', 
                                                 tab: ''}]};
            view_object.tab = m[0]
            view_object.links = m[1]
            views.push(view_object)
          }

          this.frontend_views = views
        }
      )
    )
  }

  

}
