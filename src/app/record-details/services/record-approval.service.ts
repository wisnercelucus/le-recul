import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { UtilitiesService } from "src/app/services/utilities.service";

@Injectable({providedIn: 'root'})
export class RecordApprovalService{
  private _approvalCreated: Subject<any> = new Subject()

  get approvalCreated(){
    return this._approvalCreated.asObservable();
  }

  constructor(private _http: HttpClient, 
    private _utilitiesService:UtilitiesService) {}
    
    getBaseUrl(){
      return this._utilitiesService.base_url;
    }


  saveRecordApprovalRequest(data: any): Observable<any> {
    const model = 'approval-requests'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/`;

    return this._http.post<any>(requestUrl, data).pipe(
      tap(app=>this._approvalCreated.next(app))
      );
  }

  getRecordApprovalRequests(data: any): Observable<any> {
    const model = 'approval-requests'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/record-approval-requests/`;

    return this._http.post<any>(requestUrl, data);
  }

  deleteRecordApproval(pk: any): Observable<any> {
    const model = 'approval-requests'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/delete/${pk}/`;

    return this._http.delete<any>(requestUrl);
  }

  onReviewRecordApproval(pk: any): Observable<any> {
    const model = 'approval-requests'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/review/${pk}/`;

    return this._http.get<any>(requestUrl);
  }

  onRecallRecordApproval(pk: any): Observable<any> {
    const model = 'approval-requests'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/recall/${pk}/`;

    return this._http.get<any>(requestUrl);
  }

  onRejectRecordApproval(pk: any, data: any): Observable<any> {
    const model = 'approval-requests'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/reject/${pk}/`;

    return this._http.put<any>(requestUrl, data);
  }

  onApproveRecordApproval(pk: any): Observable<any> {
    const model = 'approval-requests'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/approve/${pk}/`;

    return this._http.get<any>(requestUrl);
  }

  onGetRecordApproval(uuid: string, content_type: string, app_label:string,): Observable<any> {
    const model = 'approval-requests'
    const href = this.getBaseUrl();
    const requestUrl = `${href}${model}/record/${uuid}/${app_label}/${content_type}/`;

    return this._http.get<any>(requestUrl);
  }


}