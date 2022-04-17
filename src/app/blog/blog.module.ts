import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { HomeComponent } from './home/home.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogBannerComponent } from './home/blog-banner/blog-banner.component';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { RecentArticlesComponent } from './home/recent-articles/recent-articles.component';

import { CategoriesComponent } from './categories/categories.component';

import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleContentComponent } from './article-content/article-content.component';


@NgModule({
  declarations: [
    BlogComponent,
    HomeComponent,
    BlogBannerComponent,
    RecentArticlesComponent,
    CategoriesComponent,
    ArticleDetailComponent,
    ArticleContentComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReusableComponentsModule,
    MatIconModule,
    MatPaginatorModule,
    MatTreeModule,
    MatButtonModule,
    MatBadgeModule
  ]
})
export class BlogModule { }
