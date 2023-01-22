import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { UtilitiesService } from "src/app/services/utilities.service";

@Injectable({providedIn: 'root'})
export class RecordDetailsService{
  private _manyToManyData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _http: HttpClient, 
    private _utilitiesService:UtilitiesService) {}
    
    getBaseUrl(){
      return this._utilitiesService.base_url;
    }

    emitNewManyData(data: any){
      this._manyToManyData.next(data)
    }

    get manyToManyData(){
      return this._manyToManyData.asObservable();
    }

  getRecordDetail(model:string, uuid: string): Observable<any> {
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/${uuid}/`;

    return this._http.get<any>(requestUrl);
  }

  getRecordDetailAnonymously(model:string, uuid: string): Observable<any> {
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/${uuid}/anonymous/`;

    return this._http.get<any>(requestUrl);
  }

  recordModelManyToManyData(data: any){
    const model = 'modelrelations'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/many-to-many-data-record/`;

    return this._http.post<any>(requestUrl, data).pipe(
      map(res=>{

        const data: any[] = []
        for(let json of JSON.parse(res)){
          const record = json.fields
          record['id'] = json.pk
          const model = json.model
          record['content_type'] = model.split('.')[1]
          record['app_label'] = model.split('.')[0]
          data.push(record)
        }

        //this.emitNewManyData(data)

        return data
      })
    );
  }

  getModelManyToManyData(data: any){
    const model = 'modelrelations'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/many-to-many-data/`;

    return this._http.post<any>(requestUrl, data).pipe(
      map(res=>{

        const data: any[] = []
        for(let json of JSON.parse(res)){
          const record = json.fields
          record['id'] = json.pk
          const model = json.model
          record['content_type'] = model.split('.')[1]
          record['app_label'] = model.split('.')[0]
          data.push(record)
        }

        return data
      })
    );
  }


  //

  getRecordManyToManydata(field: string, data: any){
    const model = 'modelrelations'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/${field}/records/`;

    return this._http.post<any>(requestUrl, data);
  }

  /*deleteData(model:string, uuid: string): Observable<any> {
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/${uuid}/`;

    return this._httpClient.delete<any>(requestUrl);
  }*/

}