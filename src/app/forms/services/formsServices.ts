import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { UtilitiesService } from "src/app/services/utilities.service";
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})
export class FormsService{
     
    constructor(private _http: HttpClient, 
        private _utilitiesService:UtilitiesService){
    }
    
    getBaseUrl(tenant?: string){
        if(tenant){
            return `${environment.PROTOCOL_ROOT}${tenant}${environment.API_BASE_URL}/`
        }

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

    getObjectToUpdate(model:string, uuid: string, mode?: string, tenant?: string): Observable<any> {
        const href = this.getBaseUrl(tenant);
        let requestUrl = ''
        if(mode && mode === 'anonymous'){
            requestUrl = `${href}${model}/${uuid}/online-offline/`;
        }else{
            requestUrl = `${href}${model}/${uuid}/`;
        }
        
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

    saveFormSettings(model:string, uuid: string, data: any): Observable<any>{
        const href = this.getBaseUrl();
        const requestUrl = `${href}${model}/${uuid}/save-settings/`;
        return this._http.put<any>(requestUrl, data)
    }

    doPostResponse(model:string, uuid: string, data: any, mode?: string, tenant?: string): Observable<any> {
        const href = this.getBaseUrl(tenant);
        let requestUrl = ''

        if(mode && mode === 'anonymous'){
            requestUrl = `${href}${model}/${uuid}/online-offline/`;
        }else{
            requestUrl = `${href}${model}/${uuid}/response/`;
        }
        
        return this._http.post<any>(requestUrl, data)
        /*.pipe(
            map((data: any) => {
                const resData = {...data}
                resData.uuid = data._id
                return resData
            })
        );*/
    }

    getFormData(model:string, uuid: string): Observable<any> {
        const href = this.getBaseUrl();
        const requestUrl = `${href}${model}/${uuid}/response/`;
        return this._http.get<any>(requestUrl)
        /*.pipe(
            map((data: any) => {
                const resData = {...data}
                resData.uuid = data._id
                return resData
            })
        );*/
    }

    deleteFormResponseData(model:string, uuid: string): Observable<any> {
        const href = this.getBaseUrl();
        const requestUrl = `${href}${model}/responses/${uuid}/`;
        return this._http.delete<any>(requestUrl)
    }


    getFormResponseData(model:string, uuid: string): Observable<any> {
        const href = this.getBaseUrl();
        const requestUrl = `${href}${model}/responses/${uuid}/`;
        return this._http.get<any>(requestUrl)
    }

    getFormResponseDetails(model: string, uuid: string): Observable<any>{
        const href = this.getBaseUrl();
        const requestUrl = `${href}${model}/responses/${uuid}/details/`;
        return this._http.get<any>(requestUrl)
    }

    updateFormResponseData(model:string, uuid: string, data:any): Observable<any> {
        const href = this.getBaseUrl();
        const requestUrl = `${href}${model}/responses/${uuid}/`;
        return this._http.put<any>(requestUrl, data)
    }

    onSearchForms(model: string, data: any){
            const href = this.getBaseUrl();
            const reqUrl = `${href}${model}/search/`
            return this._http.post(reqUrl, data);
        
    }


    onFetchFormLookups(model: string, data: any){
        const href = this.getBaseUrl();
        const reqUrl = `${href}${model}/form-lookups/`
        return this._http.post(reqUrl, data);
    }


    onSearchFilteredData(model: string, data: any, tenant?: string){
        const href = this.getBaseUrl(tenant);
        const reqUrl = `${href}${model}/search-filtered-data/`
        //console.log(reqUrl)
        return this._http.post(reqUrl, data);
    
}

    onAddFormsToObject(model: string, data: any){
        const href = this.getBaseUrl();
        const reqUrl = `${href}${model}/add-to-object/`
        return this._http.post(reqUrl, data);
    }

    onGetObjectForms(model: string, data: any){
        const href = this.getBaseUrl();
        const reqUrl = `${href}${model}/get-object-forms/`
        return this._http.post(reqUrl, data);
    }

    getFormsForCollect(model: string, url?: string){
        if(!url){
            const href = this.getBaseUrl();
            const reqUrl = `${href}${model}/collect-list/`
        
            return this._http.get<any>(reqUrl);
          }

        return this._http.get<any>(url);
    }
    


}