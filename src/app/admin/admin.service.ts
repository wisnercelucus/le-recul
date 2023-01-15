import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilitiesService } from '../services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

 
  constructor(private _http: HttpClient, 
    private _utilitiesService:UtilitiesService){
}

getBaseUrl(){
    return this._utilitiesService.base_url;
}


  getObjectsPermissions(model:string): Observable<any> {
      const href = this.getBaseUrl();
      const requestUrl = `${href}${model}/objects/`;
      return this._http.get<any>(requestUrl);
  }

    saveObjectPermissions(model:string, data: any): Observable<any> {
      const href = this.getBaseUrl();
      const requestUrl = `${href}${model}/objects/`;
      return this._http.post<any>(requestUrl, data);
  }

  getObjectsFrontendViews(model:string): Observable<any> {
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/objects/`;
    return this._http.get<any>(requestUrl);
  }

  saveObjectFrontViews(model:string, data: any): Observable<any> {
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/objects/`;
    return this._http.post<any>(requestUrl, data);
  }

  getClientData(model: string){
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/info/`;
    return this._http.get<any>(requestUrl);
  }

  updateCompanyData(model:string, data: any){
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/`;
    return this._http.put<any>(requestUrl, data);
  }

  deactivateClient(model: string){
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/`;
    return this._http.get<any>(requestUrl);
  }

}
