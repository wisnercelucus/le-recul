import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";


export interface LookupModel{
    id: number;
    name: string;
    _id: string
  }
  
  export interface ModelMetaField{
    name: string;
    description: string;
    choices?: string[];
    related_model?: string;
    max_length? : number;
    is_required: boolean;
    lookups?: LookupModel[]
  }
  

@Injectable({
    providedIn: 'root'
})
export class ModelMetaService{
    
    constructor(private _http: HttpClient, private _utilitiesService:UtilitiesService){
    }
    
    getBaseUrl(){
        return this._utilitiesService.base_url;
    }

    getModelFields(model: string){
        const href = this.getBaseUrl();
        const reqUrl = `${href}meta/${model}/fields/`
        return this._http.get<{fields: ModelMetaField[]}>(reqUrl);
    }

    getModelFieldsForDetails(model: string){
        const href = this.getBaseUrl();
        const reqUrl = `${href}meta/${model}/fields/details/`
        return this._http.get<{fields: ModelMetaField[]}>(reqUrl);
    }

    getModelManyToManyFields(model: string){
        const href = this.getBaseUrl();
        const reqUrl = `${href}meta/${model}/fields/many-to-many/`
        return this._http.get<{fields: ModelMetaField[]}>(reqUrl);
    }

}