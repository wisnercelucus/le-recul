import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { BlogComponent } from './blog.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
        {path: '', component: HomeComponent},
        {path: ':article_id', component: ArticleDetailComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
