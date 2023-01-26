import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UtilitiesService } from "../services/utilities.service";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class RecordImageService{

  constructor(private _http: HttpClient, 
    private _utilitiesService:UtilitiesService) {}
    
    getBaseUrl(){
      return this._utilitiesService.base_url;
    }


  sendRecordDocument(model:string, data: any): Observable<any> {
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/`;

    return this._http.post<any>(requestUrl, data);
  }

  deleteImage(model:string, uuid: string): Observable<any> {
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/${uuid}/`;

    return this._http.delete<any>(requestUrl);
  }

  getRecordImages(model:string, app_label: string, model_type: string, uuid: string): Observable<any> {
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/${app_label}/${model_type}/${uuid}/`;

    return this._http.get<any>(requestUrl);
  }

}