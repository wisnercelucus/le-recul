import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { FeedRoutingModule } from './feed-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { ShowListComponent } from './show-list/show-list.component';

import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    FeedComponent,
    CategoriesComponent,
    ShowListComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class FeedModule { }
