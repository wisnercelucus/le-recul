import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, map, Observable, startWith, Subject } from 'rxjs';
import { SubSink } from 'subsink';
import { CascadeFormComponent } from '../cascade-form/cascade-form.component';
import { FormsService } from '../services/formsServices';
import { capitalizeFirstLetter } from 'src/settings/utilities/functions';


@Component({
  selector: 'app-lookup-field',
  templateUrl: './lookup-field.component.html',
  styleUrls: ['./lookup-field.component.scss']
})
export class LookupFieldComponent implements OnInit, OnDestroy {
  capitalizeFirstLetter = capitalizeFirstLetter
  @Output()
  lookupAdded: EventEmitter<any> = new EventEmitter()
  @Input() field: any;
  

  @Input() placeHolder = ''
  @Input() title = ''
  @Input() value!: string;
  @Input() model = '';

  searchObserver: Subject<{keyword: string, model_type: string, app_label: string}> = new Subject();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  lookupCtrl = new FormControl('');
  filteredLookups: Observable<string[]>;
  lookups: any[] = [];
  allLookups: string[] = [];
  @Input() adminCascade = false

  @ViewChild('lookupInput') lookupInput!: ElementRef<HTMLInputElement>;
  subs = new SubSink()

  constructor(private _formsService: FormsService,
    private dialog: MatDialog,
    ) {
    this.filteredLookups = this.lookupCtrl.valueChanges.pipe(
      startWith(null),
      map((lookup: string | null) => (lookup ? this._filter(lookup) : this.allLookups.slice())),
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getPlaceHolder(): string{
    const name = this.field.name
    if(name === 'parent'){
      return 'Select ' + name + ' ' + this.field.related_model;
    }else{
      return 'Select ' + name
    }
  }
  ngOnInit(): void {
    this.placeHolder = capitalizeFirstLetter(this.getPlaceHolder())
    this.title= capitalizeFirstLetter(this.field.name)
    if(this.value){
      this.allLookups.push(this.value)
      this.lookups.push(this.value)

      const name = this.field.name
      const value = +this.value.split('|')[0]
      this.lookupAdded.emit({name, value});
    }

    this.subs.add(
      this.searchObserver
      .pipe(debounceTime(500))
      .subscribe((res:any) => {
        const data = res 
        //console.log(data)
        this.subs.add(
          this._formsService.onSearchFilteredData('forms', data).subscribe(
            (result: any) =>{

              //console.log(result)
                
                for(let entry of result){
                  const val = entry.id + '|' + entry.name + '|' + entry._id
                  if(!this.allLookups.includes(val))
                  this.allLookups.push(val)
                }
  
                this.filteredLookups = this.lookupCtrl.valueChanges.pipe(
                  startWith(null),
                  map((area: string | null) => (area ? this._filter(area) : this.allLookups.slice())),
                );
          }))
        })
        )
  }

  add(event: MatChipInputEvent): void {
    console.log(event)
    const value = (event.value || '').trim();

    // Add our lookup
    if (value) {
      this.lookups = []
      this.lookups.push(value)
    }

    // Clear the input value
    event.chipInput!.clear();

    this.lookupCtrl.setValue(null);
  }

  remove(lookup: string): void {
    const index = this.lookups.indexOf(lookup);

    if (index >= 0) {
      this.lookups.splice(index, 1);
      this.lookupAdded.emit({name: this.field.name, value: null})
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const val = event.option.viewValue
    this.lookups = []

    this.lookups.push(val);
    this.lookupInput.nativeElement.value = '';
    this.lookupCtrl.setValue(null);
    const name = this.field.name
    const value = +val.split('|')[0]
    this.lookupAdded.emit({name, value});
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLookups.filter(lookup => lookup.toLowerCase().includes(filterValue));
  }


  onTypeValue(e: any){
    const value = e.target.value
    if(!value) return;

    const context = {keyword: value, model_type: this.field.related_model, app_label: this.field.app_label}
    this.searchObserver.next(context)
  }

  onCascadeForm(field:any, model: string){
    const dialogRef = this.dialog.open(CascadeFormComponent, {
      disableClose: true,
      width: '500px',
      data:  {model: model, field: field, adminCascade: this.adminCascade}
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.lookups = []
        const name = this.field.name
        const value = +result.split('|')[0]
        this.lookupAdded.emit({name, value});
        this.allLookups.push(result)
        this.lookups.push(result)
      }else{
        return;
      }
    });
  }

  allowCasscade(field: any): boolean{
    if(!this.adminCascade){
      return !['manager', 'approver', 'user'].includes(field.name)
    }else{
      return true
    }
  }
}
