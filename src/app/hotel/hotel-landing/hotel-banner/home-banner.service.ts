import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class HomeBannerService{

     
    constructor(private _http: HttpClient, 
        private _utilitiesService:UtilitiesService){
    }
    
    getBaseUrl(tenant?: string){
        if(tenant){
            return `${environment.PROTOCOL_ROOT}${environment.API_BASE_URL}/`
        }

        return this._utilitiesService.base_url;
    }

    getHomeBannerDetails(model: string){
        const href = this.getBaseUrl();
        const reqUrl = `${href}${model}/list/home/`
        return this._http.get(reqUrl)
    }



    getHomeGallryImages(model: string){
        const href = this.getBaseUrl();
        const reqUrl = `${href}${model}/list/home/images/`
        return this._http.get(reqUrl)
    }



}