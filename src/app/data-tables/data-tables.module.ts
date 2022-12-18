import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesComponent } from './data-tables.component';
import { DataTablesRotingModule } from './data-tables-routing.module';


@NgModule({
  declarations: [
    DataTablesComponent
  ],
  imports: [
    CommonModule,
    DataTablesRotingModule
  ]
})
export class DataTablesModule { }
