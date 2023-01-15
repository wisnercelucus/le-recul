import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { UtilitiesService } from "src/app/services/utilities.service";


@Injectable({
    providedIn: 'root'
})
export class ModelDataService{
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
   
    constructor(private _http: HttpClient, 
        private _utilitiesService: UtilitiesService){
    }
    
    getBaseUrl(){
        return this._utilitiesService.base_url;
    }

    doPost(model: string, data: any){
        const href = this.getBaseUrl();
        const reqUrl = `${href}${model}/`
        return this._http.post(reqUrl, data).pipe(
            map((data: any) => {
                const resData = {...data}
                resData.uuid = data._id
                return resData
            })
        );
    }

    getObjectToUpdate(model:string, uuid: string): Observable<any> {
        const href = this.getBaseUrl();
        const requestUrl = `${href}${model}/${uuid}/`;
        return this._http.get<any>(requestUrl);
    }

    doPut(model:string, uuid: string, data: any): Observable<any> {
        const href = this.getBaseUrl();
        const requestUrl = `${href}${model}/${uuid}/`;
        return this._http.put<any>(requestUrl, data).pipe(
            map((data: any) => {
                const resData = {...data}
                resData.uuid = data._id
                return resData
            })
        );
    }


}