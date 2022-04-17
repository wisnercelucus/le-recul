import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardLoaderComponent } from './profile-card-loader/profile-card-loader.component';
import { LoadingSkeletonComponent } from './loading-skeleton/loading-skeleton.component';


@NgModule({
  declarations: [
    ProfileCardLoaderComponent,
    LoadingSkeletonComponent
  ],

  imports: [
    CommonModule,
  ],

  exports: [LoadingSkeletonComponent, ProfileCardLoaderComponent,]
})
export class SkeletonLoaderModule { }
