import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { UtilitiesService } from "../services/utilities.service";


@Injectable({providedIn: 'root'})
export class TasksService{
  private _taskCreated: Subject<any> = new Subject()

  get taskCreated(){
    return this._taskCreated.asObservable();
  }

  constructor(private _http: HttpClient, 
    private _utilitiesService:UtilitiesService) {}
    
    getBaseUrl(){
      return this._utilitiesService.base_url;
    }


  createTask(data: any): Observable<any> {
    const model = 'tasks'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/`;

    return this._http.post<any>(requestUrl, data).pipe(
      tap((app: any)=>this._taskCreated.next(app))
      );
  }

  updateTask(uuid: string, data: any){
    const model = 'tasks'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/${uuid}/`;

    return this._http.put<any>(requestUrl, data);
  }

  getTask(uuid: string){
    const model = 'tasks'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/${uuid}/`;

    return this._http.get<any>(requestUrl);
  }

  completeRecord(uuid: string, model: string){
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/complete/${uuid}/`;
    return this._http.get<any>(requestUrl);
  }

  putRecordInProgress(uuid: string, model: string){
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/in-progress/${uuid}/`;
    return this._http.get<any>(requestUrl);
  }

  getRecordTasks(data: any): Observable<any> {
    const model = 'tasks'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/record-tasks/`;

    return this._http.post<any>(requestUrl, data);
  }

  deleteRecordTask(uuid: any): Observable<any> {
    const model = 'tasks'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/${uuid}/`;
    return this._http.delete<any>(requestUrl);
  }


}