import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { getModelToQuery, normalizeTitle } from 'src/settings/utilities/functions';
import { DeleteConfirmComponent } from '../my-dialogs/dialogs/delete-confirm/delete-confirm.component';
import { SubSink } from 'subsink';
import { MatSort } from '@angular/material/sort';
import { DataTablesService } from './data-tables.service';
//import { AccountsService } from '../accounts/services/accounts.services';
import { UtilitiesService } from '../services/utilities.service';
import { RoutingService } from '../routing.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


export interface TableDesc{
  name: string;
  totalRecord: number;
}


@Component({
  selector: 'vn-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss']
})
export class DataTablesComponent implements OnInit {
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

  isLoading:boolean = false;


  getModelToQuery = getModelToQuery

 @Input() model = '';
  columnsFromObject: string[] = [];
  @Input() tableDesc!: TableDesc;

  selection = new SelectionModel<any>(true, []);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  normalizeTitle = normalizeTitle;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private _dataService:DataTablesService,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _routingService: RoutingService,
    //private _accountsService:AccountsService,
    private _utilitiesService:UtilitiesService) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.model = this.getModelFromRoot()!;
    this.tableDesc = {name: this.model, totalRecord: 0}

    if(this.model){
      const modelToQuery = this.getModelToQuery(this.model)
      //this.getModelField( modelToQuery)
    }
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
    console.log(this.model)
    //this.model = this.getModelFromRoot()!;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    
    merge(this.sort!.sortChange, this.paginator!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          
          if(!this.paginationData){
            return this._dataService!.getTableData(
              this.model
            ).pipe(catchError(() => of(null)));
          }else{
            return this._dataService!.getTableData(
              this.model,
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
      this.columnsFromObject.unshift(col!.toString());
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

  onEditRecord(uuid: any): void{
    const model = this.model;
    this._routingService.onEditRecord(model, uuid);
  }

  onCollectData(uuid: any): void{
    const model = this.model;
    this._routingService.onCollectData(model, uuid);
  }

  onNavigateRecordDetails(uuid: string): void{
    const model = this.model;
    this._routingService.onNavigateRecordDetails(model, uuid);
  }



  has_permission(action: string, model: string){
    model = this.getModelToQuery(model)
    const perm = `${action}_${model}`
    return true //this.permissions.includes(perm)
  }

  openDialog(uuid: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {uuid: uuid, model: this.model},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes'){
        this._dataService.deleteData(this.model, uuid).subscribe(
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
