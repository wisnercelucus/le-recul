import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { AnimatedSideBarComponent } from './animated-side-bar.component';
import { DynamicSideNavComponent } from './dynamic-side-nav/dynamic-side-nav.component';
import { DynamicDashboardComponent } from './dynamic-dashboard/dynamic-dashboard.component'
import { RouterModule } from '@angular/router';
import { SublevelMenuComponent } from './sublevel-menu/sublevel-menu.component';

@NgModule({
  declarations: [
    AnimatedSideBarComponent,
    DynamicSideNavComponent,
    DynamicDashboardComponent,
    SublevelMenuComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    CdkMenuModule,
    RouterModule,
    
  ],
  exports: [DynamicSideNavComponent]
})
export class AnimatedSideBarModule { }
