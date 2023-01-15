import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UtilitiesService } from 'src/app/services/utilities.service';

export interface User{
  name?: string;
  email?:string;
  id:number;
  _id:string;
  username?: string;
  
}

export interface UserProfile{
  last_name?: string;
  first_name?: string;
  bio?: string;
  moto?:string;
  sex?:string;
  birth_date?:Date;
  joined_on?: Date;
  id:number;
  _id:string;
  user: User;
  avatar?:string;
  quote?:string;
  quote_author?: string;
  user_permissions?: any[];
  frontend_views?: any[];
  position?: any;
  user_permissions_codes?:string[]
}


@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private _loginUser: BehaviorSubject<UserProfile|null> = new BehaviorSubject<UserProfile|null>(null)
 
  private _userPermissionsCodes: BehaviorSubject<string[]|null> = new BehaviorSubject<string[]|null>(null)
  private _userViews :  BehaviorSubject<any> = new BehaviorSubject<any>(null) 

  constructor(private _http: HttpClient, 
    private _cookie: CookieService,
    private _utilitiesService:UtilitiesService){}

  getBaseUrl(){
      return this._utilitiesService.base_url;
  }

  get loginUser(){
    return this._loginUser.asObservable()
  }

  get userViews(){
    return this._userViews.asObservable()
  }

  get userPermissionsCodes(){
    return this._userPermissionsCodes.asObservable()
  }

  emitLoginUser(userProfile: UserProfile|null){
      this._loginUser.next(userProfile)
      
  }

  emitNullUser(){
    this._loginUser.next(null)
  }

  getMyProfile(): Observable<any> {
      const href = this.getBaseUrl();
      const model = 'accounts'
      const requestUrl = `${href}${model}/me/`;
      return this._http.get<UserProfile>(requestUrl).pipe(
        tap((res: UserProfile)=>{

          const profile: UserProfile = {
            _id: res._id,
            last_name: res.last_name,
            avatar: res.avatar,
            id: 0,
            user: res.user,  
            position: res.position        
          }

          this._userViews.next(res.frontend_views)
          this._userPermissionsCodes.next(res.user_permissions_codes!)
          
          this._cookie.put('userprofile', JSON.stringify(profile))

          const profileEmitted = {...profile, frontend_views: res.frontend_views}

          this._loginUser.next(profileEmitted)
          return res
        })
      );
  }


  getUserPermissionCodes(){
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/my-permissions/`;
    return this._http.get<string[]>(requestUrl).pipe(
      tap((codes: string[]) => {
        this._userPermissionsCodes.next(codes)
      })
    )
  }

  createUser(data: any): Observable<any> {
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/`;
    return this._http.post<UserProfile>(requestUrl, data)
  }

  updateUser(data: any, uuid: string): Observable<any> {
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/${uuid}/`;
    return this._http.put<UserProfile>(requestUrl, data)
  }


  updateUserByUsername(data: any, username: string){
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/of/${username}/`;
    return this._http.put<UserProfile>(requestUrl, data)
  }

  deleteUser(uuid: string): Observable<any> {
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/${uuid}/`;
    return this._http.delete<UserProfile>(requestUrl)
  }

  deActivateUser(data: any, uuid: string): Observable<any> {
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/${uuid}/deactivate/`;
    return this._http.put<UserProfile>(requestUrl, data)
  }

  getUserProfile(uuid: string): Observable<any> {
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/${uuid}/`;
    return this._http.get<UserProfile>(requestUrl)
  }

  getUserProfileByUsername(username: string): Observable<any> {
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/of/${username}/`;
    return this._http.get<UserProfile>(requestUrl)
  }

  updateUserIdentifications(data: any, username: string){
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/ids/${username}/`;
    return this._http.put<UserProfile>(requestUrl, data)
  }

  updateUserPassword(data: any, username: string){
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/password/${username}/`;
    return this._http.put<UserProfile>(requestUrl, data)
  }

  updateProfilePicture(data:any, username: string){
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/avatar/${username}/`;
    return this._http.put<UserProfile>(requestUrl, data)
  }

  checkViewPermission(data: {url: string}): Observable<any> {
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/check-view/`;
    return this._http.post<{has_view:boolean}>(requestUrl, data)
  }

  checkPermission(data: {perm: string}): Observable<any> {
    const href = this.getBaseUrl();
    const model = 'accounts'
    const requestUrl = `${href}${model}/check-permission/`;
    return this._http.post<{has_permission:boolean}>(requestUrl, data)
  }

}
