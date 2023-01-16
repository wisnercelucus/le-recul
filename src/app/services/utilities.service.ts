import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
//import { CookieService } from 'ngx-cookie';
import { BehaviorSubject,} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private _base_url = '';
  //private _tenant = '';
  private _public_base_url = ''
  private _public_base_api_url = ''

  private _modelToFilter:BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _modelToFilterFromActivatedRoute:BehaviorSubject<string> = new BehaviorSubject<string>('');

  get modelToFilter(){
    return this._modelToFilter.asObservable();
  }

  get modelToFilterFromActivatedRoute(){
    return this._modelToFilterFromActivatedRoute.asObservable();
  }

  get base_url(){
      this._base_url = `${environment.PROTOCOL_ROOT}${environment.API_BASE_URL}/`;
      return this._base_url;
  }

  get public_base_api_url(){
    this._public_base_api_url = `${environment.PROTOCOL_ROOT}${environment.PUBLIC_API_BASE_URL}/`;
    return this._public_base_api_url;
  }

  get public_base_url(){
    this._public_base_url = `${environment.PROTOCOL_ROOT}${environment.PUBLIC_BASE_URL}/`;
    return this._public_base_url;
  }

  get base_url_no_trail(){
    //console.log(`${environment.PROTOCOL_ROOT}${environment.API_ROOT_URL}`)
      return `${environment.PROTOCOL_ROOT}${environment.API_ROOT_URL}`
  }

  get base_url_no_api(){
    //console.log(`${environment.PROTOCOL_ROOT}${environment.API_ROOT_URL}`)
      return `${environment.PROTOCOL_ROOT}${environment.PUBLIC_BASE_URL}`
  }

  emitModelToFilter(value: string): void{
    this._modelToFilter.next(value)
  }

  emitModelToFilterFromActivatedRoute(value: string): void{
    this._modelToFilterFromActivatedRoute.next(value)
  }

  /*setTenant(value: string){
    this._tenant = value;
  }*/

  constructor(/*private _cookieService: CookieService*/) { }
  
  /*get tenant(){
    const retrievedTenant = this._cookieService.get("tenant");
    this.setTenant(retrievedTenant);
    return this._tenant;
  }*/

  formateDate(date:Date, format:any){
    let pipe = new DatePipe('en-US');
    //console.log(pipe.transform(date, format))
    return pipe.transform(date, format);
  }

  formatAMPM(time: any) {
    const date = new Date("1970-01-01 " + time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutes_ = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    var strTime = hours + ':' + minutes_ + ' ' + ampm.toUpperCase();
    return strTime;
  }

  getApiUrl(){
    return `${environment.PROTOCOL_ROOT}${environment.API_BASE_URL}/`;
  }
}
