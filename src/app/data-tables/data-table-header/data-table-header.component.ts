import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RelatedRecordFormsComponent } from 'src/app/forms/related-record-forms/related-record-forms.component';
import { RoutingService } from 'src/app/routing.service';
import { DATA_ENTRY_PATH_PREFIX } from 'src/settings/utilities/config';

@Component({
  selector: 'app-data-table-header',
  templateUrl: './data-table-header.component.html',
  styleUrls: ['./data-table-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeaderComponent implements OnInit {
  @Input() tabName!: string;
  @Input() totalRecord!: number;
  @Output() shuffleTable = new EventEmitter();
  @Output() addColumnToTable = new EventEmitter();
  @Output() removeColumnToTable = new EventEmitter();
  @Output() filterToTable:EventEmitter<any> = new EventEmitter();
  @Input() model!: string;
  @Input() formData: boolean = false;
  @Input() form_id!: string;
  @Input() hasEditPermission = false;
  @Input() onManyToMany=false
  @Input() hasAdditionCollumn = false

  @Input() onLookupDataTable = false
  @Input() lookup_field = ''
  @Input() model_id!: number;
  DATA_ENTRY_PATH_PREFIX = DATA_ENTRY_PATH_PREFIX

  constructor(private _router: Router, private dialog:MatDialog, private _routingService: RoutingService) { }

  ngOnInit(): void {
  }
  addColumn(){
    this.addColumnToTable.emit();
  }

  applyFilter($event: any){
    this.filterToTable.emit($event)
  }

  removeColumn(){
    this.removeColumnToTable.emit();
  }

  shuffle(){
    this.shuffleTable.emit();
  }

  onLoadForm(model:string){
    this._router.navigate([`/${DATA_ENTRY_PATH_PREFIX}/${model}/new`])
  }

  onCollectData(uuid: any): void{
    const model = this.model;
    this._routingService.onCollectData(model, uuid);
  }

  getHiddenLinks(model: string, lookup_field: string){
    //console.log(model, lookup_field)
    if(model === 'components' && lookup_field === 'project'){
      return ['program',]
    }

    if(model === 'milestones' && lookup_field === 'project'){
      return ['program',]
    }


    if(model === 'indicators' && lookup_field === 'project'){
      return ['activity', 'output', 'outcome',]
    }

    if(model === 'activities' && lookup_field === 'project'){
      return ['output',]
    }

    if(model === 'milestones' && lookup_field === 'program'){
      return ['project',]
    }

    if(model === 'components' && lookup_field === 'program'){
      return ['project',]
    }

    if(model === 'indicators' && lookup_field === 'output'){
      return ['activity', 'outcome', 'project',]
    }

    if(model === 'activities' && lookup_field === 'output'){
      return ['project',]
    }

    if(model === 'indicators' && lookup_field === 'outcome'){
      return ['activity', 'output', 'project',]
    }

    if(model === 'indicators' && lookup_field === 'activity'){
      return ['outcome', 'output', 'project',]
    }


    if(model === 'learningnotes' && lookup_field === 'project'){
      return ['program', 'project', 'name',]
    }

    if(model === 'learningnotes' && lookup_field === 'program'){
      return ['program', 'project', 'name',]
    }

    if(model === 'stories' && lookup_field === 'program'){
      return ['program', 'project', 'name',]
    }

    if(model === 'stories' && lookup_field === 'project'){
      return ['program', 'project', 'name',]
    }

    if(model === 'secondaryareas'){
      return ['primary_area',]
    }

    if(model === 'tertiaryareas'){
      return ['secondary_area',]
    }

    if(model === 'communities'){
      return ['tertiary_area',]
    }

    return []
  }


  onAddRelatedForm(lookup_field:any, model: string, model_id: number){
    //console.log(lookup_field)
    const hide_links = this.getHiddenLinks(model, lookup_field)
    const dialogRef = this.dialog.open(RelatedRecordFormsComponent, {
      disableClose: true,
      width: '500px',
      data:  {model: model, field: lookup_field, id: model_id, hiddenLookups: hide_links}
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
