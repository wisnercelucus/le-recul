import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnimatedSideBarModule } from '../shares/animated-side-bar/animated-side-bar.module';
import { CustomTopbarModule } from '../shares/custom-topbar/custom-topbar.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    AnimatedSideBarModule,
    CustomTopbarModule
  ]
})
export class AdminModule { }
