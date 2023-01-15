import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private _router: Router) { }

  onEditRecord(model: string, uuid: any): void{
    const path = `/${model}/edit/${uuid}`;
    this._router.navigate([path]);
  }

  onEditRecordInAdmin(model: string, uuid: any): void{
    const path = `/admin/${model}/edit/${uuid}`;
    this._router.navigate([path]);
  }

  onEditFormResponse(model: string, uuid: string){
    const path = `/${model}/response/${uuid}/update`;
    this._router.navigate([path]);
  }

  ongetFormResponseDetails(model: string, uuid: string){
    const path = `/${model}/response/${uuid}/details`;
    this._router.navigate([path]);
  }

  onNavigateRecordDetails(model: string, uuid: string): void{
    const path = `/${model}/${uuid}/details`
    this._router.navigate([path])
  }

  onNavigateRecordLooups(model: string, _id: string, lookup_name: string): void{
    const path = `/${model}/${_id}/associated/${lookup_name}`
    this._router.navigate([path])
  }

  

  onNavigateToUserProfile(model: string, username: string): void{
    const path = `/${model}/${username}`
    this._router.navigate([path])
  }

  onNavigateRecordAdminDetails(model: string, uuid: string): void{
    const path = `/admin/${model}/${uuid}/details`
    this._router.navigate([path])
  }

  onNavigateRecordAccountDetails(model: string, uuid: string): void{
    const path = `/${model}/${uuid}/details`
    this._router.navigate([path])
  }

  onNavigateToModel(model: string){
    const path = `/${model}`
    this._router.navigate([path])
  }

  onNavigateToSdminTable(model: string){
    const path = `/admin/${model}`
    this._router.navigate([path])
  }



  onCollectData(model: string, uuid: any): void{
    const path = `/${model}/response/${uuid}`;
    this._router.navigate([path]);
  }
}
