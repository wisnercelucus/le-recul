import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { SubSink } from 'subsink';
import { AccountsService } from '../accounts/services/accounts.service';
import { DataTablesService } from '../data-tables/data-tables.service';
import { DeleteConfirmComponent } from '../my-dialogs/dialogs/delete-confirm/delete-confirm.component';
import { RoutingService } from '../routing.service';
import { TableDesc } from '../data-tables/data-tables.component';
import { UtilitiesService } from '../services/utilities.service';
import { getModelToQuery, normalizeTitle } from 'src/settings/utilities/functions';

@Component({
  selector: 'app-record-lookups',
  templateUrl: './record-lookups.component.html',
  styleUrls: ['./record-lookups.component.scss']
})
export class RecordLookupsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'star',];
  firstLoad = true;
  additionalColumns: string[] = [];
  dataSource: any;
  recordList!: any[];
  subs = new SubSink()
  permissionCodes: any[] = [];
  permissions: string[] = [];
  paginationData: any;
  data: any;
  pageNo=0;
  //modelToQuery = ''
  targetField!: string;
  model_id = 0

  isLoading:boolean = false;
  

  getModelToQuery = getModelToQuery

  model!: string;
  model_uuid = '';
  targetModel = '';
  columnsFromObject: string[] = [];
  tableDesc: TableDesc = {name: 'table', totalRecord: 0};

  selection = new SelectionModel<any>(true, []);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  normalizeTitle = normalizeTitle;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private _dataService:DataTablesService,
    public dialog: MatDialog,
    private _routingService: RoutingService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _accountsService:AccountsService,
    private _utilitiesService:UtilitiesService) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    //this.getUserPermissionCodes()

    this._router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };



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
    this.model= this._route.snapshot.paramMap.get('model')!

     this.targetModel = this._route.snapshot.paramMap.get('lookup_name')!
     this.tableDesc['name'] = this.targetModel
     this.model_uuid = this._route.snapshot.paramMap.get('record-id')!
     const m = this.getModelToQuery(this.model)

     this._dataService.getLookupMasterRecodIdData({"model": m, "uuid": this.model_uuid}).subscribe({
      next: (data:any) => {
        this.model_id = data.id
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err)
      }
     })




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

  getTargetField(modelToQuery: string): string{
    //console.log(modelToQuery)
    if(modelToQuery === 'tertiaryarea'){
      return 'tertiary_area'
    }

    if(modelToQuery === 'secondaryarea'){
      return 'secondary_area'
    }

    if(modelToQuery === 'primaryarea'){
      return 'primary_area'
    }

    return modelToQuery
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    
    merge(this.sort!.sortChange, this.paginator!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const targetModelToQuery = this.getModelToQuery(this.targetModel)
          const modelToQuery = this.getModelToQuery(this.model)
          
          this.targetField = this.getTargetField(modelToQuery)
          
          if(!this.paginationData){
            return this._dataService!.getLookuptableData(
              modelToQuery,
              this.model_uuid,
              targetModelToQuery
            ).pipe(catchError(() => of(null)));
          }else{
            return this._dataService!.getLookuptableData(
              modelToQuery,
              this.model_uuid,
              targetModelToQuery,
              this.paginationData.next
            ).pipe(catchError(() => of(null)));
          }

        }),
        map((data:any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          if (data === null) {
            return [];
          }
          this.paginationData = data;
          //console.log(this.paginationData)
          const results = data.results
          this.data = results;
          this.resultsLength = data.count;
          return results;
        }),
      )
      .subscribe(data => {
        if(data && data.length && this.firstLoad){
          this.getCollums(data[0]);
        }
        this.firstLoad = false;
        this.dataSource = new MatTableDataSource(data)
      });
  }

  addColumn() {
    //const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    let col = this.additionalColumns.pop();

    if(col && !this.displayedColumns.includes(col!.toString())){
      this.displayedColumns.splice(1, 0, col!.toString());
      this.columnsFromObject.push(col!.toString());
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
    
    while (0 !== currentIndex && currentIndex !== this.displayedColumns.length -1) {
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
        return value.name;
      }
      return value;
      
    }

    if(typeof(value) === 'boolean' || 
      ['true', 'false', true, false].includes(value)
    ){
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
    //console.log(Object.keys(data))
    const columns = Object.keys(data)
    //console.log(columns)
    for(let key of columns){
      if(i < 15){
        this.displayedColumns.splice(1, 0, key);
        this.columnsFromObject.push(key)
      }else{
        this.additionalColumns.push(key)
      }
      i++
    }
  }


  getValueOnObject(value: any){
    if(typeof(value) === 'object'){
      if(value && value.name){
        return value.name;
      }
    }

    return value

  }

  onEditRecord(prefix: string, uuid: any): void{
    const model = this.getpath(this.targetModel);
    this._routingService.onEditRecord(prefix, model, uuid);
  }

  onCollectData(uuid: any): void{
    const model = this.model;
    this._routingService.onCollectData(model, uuid);
  }

  getpath(model: string){
    if(model === 'trackindicators'){
      return 'track-indicators'
    }if(model === 'learningnotes'){
      return 'learning-notes'
    }

    
    return model
  }

  onNavigateRecordDetails(prefix: string, uuid: string): void{
    const model = this.getpath(this.targetModel);
    this._routingService.onNavigateRecordDetails(prefix, model, uuid);
  }


  has_permission(action: string, model: string){
    model = this.getModelToQuery(model)
    const perm = `${action}_${model}`
    return this.permissions.includes(perm)
  }

  openDialog(uuid: string): void {
    const model = this.getpath(this.targetModel);

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


  loadMore(url:string){
    this.subs.add(
      this._dataService.loadMoreData(url)
      .subscribe((res: any)=>{
        const results = [...this.data, ...res['results']];
        this.dataSource = new MatTableDataSource(results)
        this.paginationData = res;
      },)
    )
  }

  onChangePage(eventData:PageEvent){
    if(eventData.pageIndex > this.pageNo) {
      let url = this.paginationData.next;
      this.loadMore(url);
    }
  }

  hasAdditionColumn(additionalColumns: any){
    return (additionalColumns && additionalColumns.length > 0)
  }
}
