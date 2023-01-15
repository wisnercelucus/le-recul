import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesComponent } from './data-tables.component';
import { DataTablesRotingModule } from './data-tables-routing.module';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataTableHeaderComponent } from './data-table-header/data-table-header.component';
import { MatMenuModule } from '@angular/material/menu';
import { RelatedRecordFormsModule } from '../forms/related-record-forms/related-record-forms.module';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    DataTablesComponent,
    DataTableHeaderComponent,
  ],
  imports: [
    CommonModule,
    DataTablesRotingModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    RelatedRecordFormsModule
  ]
})
export class DataTablesModule { }
