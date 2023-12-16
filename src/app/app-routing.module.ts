import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnAuthGuard } from './auth/services/un-auth.guard';
import { AuthGuard } from './auth/services/auth.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule) },
  {path: 'auth', canActivate:[UnAuthGuard], loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)},
  {path: 'accounts', canActivate:[AuthGuard], loadChildren: () => import("./accounts/accounts.module").then(m => m.AccountsModule)},
  {path: 'admin', canActivate:[AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: 'admin/:model/:record-id/associated/:lookup_name', canActivate:[AuthGuard,], loadChildren: () => import("./record-lookups/record-lookups.module").then(m => m.RecordLookupsModule)},
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {path:"**", loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule)},
  
  //{path: ':model', loadChildren: () => import('./data-tables/data-tables.module').then(m => m.DataTablesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledNonBlocking',
    onSameUrlNavigation: 'reload', 
    paramsInheritanceStrategy: 'always'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
