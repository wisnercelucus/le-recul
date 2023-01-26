import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordLookupsComponent } from './record-lookups.component';
import { RecordLookupsRoutingModule } from './record-lookups-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataTablesModule } from '../data-tables/data-tables.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    RecordLookupsComponent
  ],
  imports: [
    RecordLookupsRoutingModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatCheckboxModule,
    DataTablesModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatAutocompleteModule,
  ]
})
export class RecordLookupsModule { }
