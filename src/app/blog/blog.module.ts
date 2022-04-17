import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { HomeComponent } from './home/home.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogBannerComponent } from './home/blog-banner/blog-banner.component';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { RecentArticlesComponent } from './home/recent-articles/recent-articles.component';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CategoriesComponent } from './categories/categories.component';
import {MatTreeModule} from '@angular/material/tree';

import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    BlogComponent,
    HomeComponent,
    BlogBannerComponent,
    RecentArticlesComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReusableComponentsModule,
    MatIconModule,
    MatPaginatorModule,
    MatTreeModule,
    MatButtonModule
  ]
})
export class BlogModule { }
