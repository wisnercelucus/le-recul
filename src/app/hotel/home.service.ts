import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

   
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient, 
      private _utilitiesService:UtilitiesService){
  }

  getPublicBaseUrl(){
      return this._utilitiesService.public_base_url;
  }

  sendContactMessage(data: any){
      const href = this.getPublicBaseUrl();
      const requestUrl = `${href}api/home/send/`;
      return this._http.post<any>(requestUrl, data, {headers: this.headers});
  }

  getPrimaryContact(){
    const href = this.getPublicBaseUrl();
    const requestUrl = `${href}api/primary_contact/`;
    return this._http.get<any>(requestUrl);
}

  onSubscribe(data: any){
      const href = this.getPublicBaseUrl();
      const requestUrl = `${href}api/home/create/`;
      return this._http.post<any>(requestUrl, data, {headers: this.headers});
  }

  sendBungReport(data: any){
    const href = this.getPublicBaseUrl();
    const requestUrl = `${href}api/home/send/bug/`;
    return this._http.post<any>(requestUrl, data, {headers: this.headers});
}



}
