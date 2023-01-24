import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl = environment.COUNTRIES_API_ROOT_URL
  constructor(private _http: HttpClient) { }

  getCountries(label: string){
    return this._http.get(`${this.baseUrl}/${label}`)
  }

  getCountry(label: string, target: string){
    return this._http.get(`${this.baseUrl}/${label}/${target}`)
  }
}
