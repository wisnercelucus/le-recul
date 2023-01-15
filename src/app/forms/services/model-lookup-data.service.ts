import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";


@Injectable({
    providedIn: 'root'
})
export class ModelLookupDataService{
    
    constructor(private _http: HttpClient, private _utilitiesService:UtilitiesService){
    }
    
    getBaseUrl(){
        return this._utilitiesService.base_url;
    }

    getFormLookupDataFor(model: string){
        const href = this.getBaseUrl();
        const reqUrl = `${href}${model}/form-lookups/`
        return this._http.get<any[]>(reqUrl);
    }



}