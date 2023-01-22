import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilitiesService } from '../services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class DataTablesService {

  constructor(private _httpClient: HttpClient, 
    private _utilitiesService:UtilitiesService) {}
    getBaseUrl(){
      return this._utilitiesService.base_url;
    }


  getData(model:string): Observable<any> {
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/`;

    return this._httpClient.get<any>(requestUrl);
  }

  getTableData(model:string, url?: string): Observable<any> {
    if(!url){
      const href = this.getBaseUrl();
      const requestUrl = `${href}${model}/list/`;
  
      return this._httpClient.get<any>(requestUrl);
    }
    return this._httpClient.get<any>(url);

  }

  getDataForForms(model:string, url?: string): Observable<any> {
    if(!url){
      const href = this.getBaseUrl();
      const requestUrl = `${href}${model}/fill/`;
  
      return this._httpClient.get<any>(requestUrl);
    }
    return this._httpClient.get<any>(url);

  }

  getPublicData(model:string, url?: string): Observable<any> {
    if(!url){
      const href = this.getBaseUrl();
      const requestUrl = `${href}${model}/public/`;
  
      return this._httpClient.get<any>(requestUrl);
    }
    return this._httpClient.get<any>(url);

  }

  getLookuptableData(model: any, uuid: string, target_model: string, url?: string): Observable<any> {
    if(!url){
      const href = this.getBaseUrl();
      const requestUrl = `${href}model-lookups/?model=${model}&model_uuid=${uuid}&target_model=${target_model}`;
  
      return this._httpClient.get<any>(requestUrl);
    }

    return this._httpClient.get<any>(url);

  }

  getLookupMasterRecodIdData(data: any): Observable<any> {

    const href = this.getBaseUrl();
    const requestUrl = `${href}model-lookups/id/`;

    return this._httpClient.post<any>(requestUrl, data);
    

  }

  loadMoreData(url: string){
    return this._httpClient.get<any>(url);
  }

  deleteData(model:string, uuid: string): Observable<any> {
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/${uuid}/`;

    return this._httpClient.delete<any>(requestUrl);
  }


}
