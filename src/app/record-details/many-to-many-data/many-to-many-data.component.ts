import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { DataTablesService } from 'src/app/data-tables/data-tables.service';
import { DeleteConfirmComponent } from 'src/app/my-dialogs/dialogs/delete-confirm/delete-confirm.component';
import { RoutingService } from 'src/app/routing.service';
import { SubSink } from 'subsink';
import { RecordDetailsService } from '../services/record-details.service';
import { TableDesc } from 'src/app/data-tables/data-tables.component';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { normalizeTitle } from 'src/settings/utilities/functions';
import { DATA_ENTRY_PATH_PREFIX } from 'src/settings/utilities/config';

@Component({
  selector: 'app-many-to-many-data',
  templateUrl: './many-to-many-data.component.html',
  styleUrls: ['./many-to-many-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManyToManyDataComponent implements OnInit {
  @Input() meta_data!: {object_id: number, content_type: string, app_label:string};
  @Input() field!: string;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  @Input()
  form_id!: string;
  subs = new SubSink();
  model = '';

  tableDesc: TableDesc = {
    name: '',
    totalRecord: 10
  }

  constructor(private _recordDetailsService: RecordDetailsService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private _routingService: RoutingService,
    private _dataService: DataTablesService,
    private _utilitiesService:UtilitiesService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }



  displayedColumns: string[] = ['select', 'star',];
  firstLoad = true;
  additionalColumns: string[] = [];
  dataSource: any;
  recordList!: any[];


  columnsFromObject: string[] = [];


  selection = new SelectionModel<any>(true, []);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  normalizeTitle = normalizeTitle;



  ngOnInit(): void {

    this.subs.add(
      this._recordDetailsService.manyToManyData.subscribe(res=>{
        if(res){
          
          this.dataSource = new MatTableDataSource(res)
          if(res && res.length){
            this.getCollums(res[0])
          }
          
          this.ref.detectChanges()
        }
      })
    )
  }

  isAllSelected() {
    if(this.dataSource){
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    return false;

  }


  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.number + 1}`;
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    
    merge(this.sort!.sortChange, this.paginator!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const data_: any = {}
          data_['content_type'] = this.meta_data.content_type;
          data_['object_id'] = this.meta_data.object_id;
          data_['app_label'] = this.meta_data.app_label;
          data_['field'] = this.field;
          return this._recordDetailsService.getModelManyToManyData(data_)
          .pipe(catchError(() => of(null)));
        }),
        map((data:any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          if (data === null) {
            return [];
          }
          this.resultsLength = data.length;
          return data;
        }),
      )
      .subscribe(data => {
        if(data && data.length && this.firstLoad){
          const firstRecord = data[0]
          this.getCollums(firstRecord);
          const contentType = firstRecord.content_type

          if(contentType === 'developmentsector'){
            this.model = 'sectors'
          }else{
            this.model = contentType + 's'
          }
          
        }
        this.firstLoad = false;
        this.dataSource = new MatTableDataSource(data)

        this.ref.detectChanges()
      });
  }

  addColumn() {
    //const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    let col = this.additionalColumns.pop();

    if(col && !this.displayedColumns.includes(col!.toString())){
      this.displayedColumns.splice(1, 0, col!.toString());
      this.columnsFromObject.push(col!.toString())
    }

  }

  onFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeColumn() {
    if (this.displayedColumns.length) {
      this.displayedColumns.pop();
    }
  }

  shuffle() {
    let currentIndex = this.displayedColumns.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      let temp = this.displayedColumns[currentIndex];
      this.displayedColumns[currentIndex] = this.displayedColumns[randomIndex];
      this.displayedColumns[randomIndex] = temp;
    }
  }

  isValidDate(value: any) {
    var dateWrapper = new Date(value);
    return !isNaN(dateWrapper.getDate());
  }

  getElementFromCol(col:string, element: any){
    let value: any;
    
    value = element[col];

    if (col === 'id'){
      return value;
    }

    if (col === 'name'){
      return value;
    }

    if(typeof(value) === 'number'){
      return value;
    }

    if(typeof(value) === 'object'){
      if(value && value.name){
        return value.name
      }else if(value && value._id){
        return value._id
      }
      return value;
    }
   
    if(this.isValidDate(value))
    {
      return this._utilitiesService.formateDate(value, 'short');
    }
    return value;
  }

  getCollums(data:Object){
    let i = 0;
    for(let key of Object.keys(data)){
      if(key === 'deleted_at') continue;

      if(i < 15){
        this.displayedColumns.splice(1, 0, key);
        this.columnsFromObject.push(key)
      }else{
        this.additionalColumns.push(key)
      }
      i++
    }
  }


  onEditRecord(uuid: any): void{
    const model = this.getRouteFromMode(this.model)
    this._routingService.onEditRecord(DATA_ENTRY_PATH_PREFIX, model, uuid);
  }

  onCollectData(uuid: any): void{
    const model = this.model;
    this._routingService.onCollectData(model, uuid);
  }

  onNavigateRecordDetails(uuid: string): void{
    const model = this.getRouteFromMode(this.model.toLocaleLowerCase())
    this._routingService.onNavigateRecordDetails(DATA_ENTRY_PATH_PREFIX, model, uuid);
  }


  openDialog(uuid: string): void {
    const model = this.getRouteFromMode(this.model)

    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {uuid: uuid, model: model},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes'){
        this._dataService.deleteData(model, uuid).subscribe(
          res=>{
            let data = [...this.dataSource.data];

            data = data.filter((record: any) => record._id !== uuid);
            this.dataSource = new MatTableDataSource(data)
          }
        );

      }else{
        return;
      }
    });
  }


  getRouteFromMode(model: string){
    if(model === 'userroles'){
      return 'roles'
    }

    return model

  }

}
