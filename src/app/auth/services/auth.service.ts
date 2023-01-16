import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { map, Subject} from 'rxjs';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private token:string|null="";
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer:any;
  private userId:string|null="";
  loginRedirectUrl="";

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  //webSoceketUp:Subject<void> = new Subject();

  private BASE_URL = environment.API_BASE_URL + "/accounts/";
  private ROOT_BASE_URL = environment.API_BASE_URL;
  subs = new SubSink()

  constructor(private http:HttpClient,
      private router:Router, 
      private cookie:CookieService, 
      private _accountsService:AccountsService,
      @Inject(PLATFORM_ID) private platformId: Object ){}

    ngOnDestroy(): void {
        this.subs.unsubscribe()
    }

  getToken(){
      return this.token;
  }

  getIsAuth(){
      return this.isAuthenticated;
  }

  getAuthStatusListener(){
      return this.authStatusListener.asObservable();
  }

  signup(data:any){
      return this.http.post(this.BASE_URL + "signup", data, {headers: this.headers});
  }

  verifyEmail(token:string){
      return this.http.get(this.BASE_URL + "email/confirm/" + token);
  }

  requestEmailChange(){
      return this.http.get(this.BASE_URL + "identity/confirm");
  }

  passwordResetRequest(data:any){
    const href = `${environment.PROTOCOL_ROOT}${data.tenant}${this.BASE_URL}password_reset/`
    return this.http.post(href, data, {headers: this.headers});
  }

  validateToken(tenant:string, token: string){
    const data = {token: token}
    const href = `${environment.PROTOCOL_ROOT}${tenant}${this.BASE_URL}validate_token/`
    return this.http.post(href, data, {headers: this.headers});
  }

  resetPasswordConfirm(token:string, tenant:string, password:string){
      const data = {'token': token, 'password': password};
      const href = `${environment.PROTOCOL_ROOT}${tenant}${this.BASE_URL}password_reset/confirm/`
      return this.http.post(href, data, {headers: this.headers})
  }


  login(data:any){
    const href = `${environment.PROTOCOL_ROOT}${this.BASE_URL}token/`
      return this.http.post<{refresh: string, access: string, expiresIn: number, email: string}>(href, data, {headers: this.headers}).pipe(
          map(res=>{
              this.token = res.access;
              
              if(this.token){
                  const expireDuration= res.expiresIn;
                  this.isAuthenticated = true;
                  this.authStatusListener.next(true);
                  const now = new Date();
                  const expirationDate = new Date(now.getTime() + expireDuration * 1000);
                  this.saveAuthData(this.token, expirationDate, data.tenant);

                  this.subs.add(
                    this._accountsService.getMyProfile().subscribe(res=>{
                        //console.log(res)
                        if(this.loginRedirectUrl){
                            //console.log(this.loginRedirectUrl)
                              const urlParts = this.loginRedirectUrl.split("?")
                            
                              if(!this.loginRedirectUrl.includes('?')){
                                  this.router.navigate([this.loginRedirectUrl]);
                              }else{
                                  const uri = urlParts[0]
                                  const queryParams = urlParts[1];
                                  const title = queryParams.split("=")[1];
                                  this.router.navigate([uri], { queryParams: { title: title } });
                              }
                              
                            }else{
                                this.router.navigate(['/admin']);
                            }
                    })
                  )

                                            
                  
                  if(isPlatformBrowser(this.platformId)){
                      //this.webSocektSerice.onConnectWebSocekt(this.token);
                      //this.webSocektSerice.joinRoom();
                      //this.webSoceketUp.next();
                      this.setExpirationTimer(expireDuration);
                  }

                  //this.updateUserPushSubScription(this.userId)?.subscribe();Profile();
   
              }
          })
      );
  }

  getUserId(){
      return this.userId;
  }


  autoAuthUser(){
      const authInfo = this.getAuthData();
      if(authInfo){
          const now = new Date();
          const  isInFuture = authInfo!.expirationDate > now;
          const  remainningTime = authInfo!.expirationDate.getTime() - now.getTime();
  
          if(isInFuture){
            this.subs.add(
                this._accountsService.getMyProfile().subscribe(
                    {
                        next: (res: any) => {},
                        error: (err: HttpErrorResponse) => {
                            if(err.error){
                                if(err.error.detail && err.error.code){
                                    const detail = err.error.detail
                                    const code = err.error.code

                                    if(code === 'token_not_valid'){
                                        this.logout()
                                    }
                                }
                            }
                        }
                    }
                )
            )

            /*this.subs.add(
                this._accountsService.getUserPermissionCodes().subscribe()
            )*/
              //this.userId = authInfo!.userId;
              this.token =authInfo!.token;
              this.isAuthenticated=true;
              this.authStatusListener.next(true);
              //let loginUser = this.cookie.get('userprofile')

              /*if(loginUser){
                console.log(loginUser)
                const userLoaded: UserProfile = JSON.parse(loginUser)
                this._accountsService.emitLoginUser(userLoaded)

                this.loadLoginUser();
              }*/
              //this._accountsService.getUserPermissionCodes();
              /*this.subs.add(
                this._accountsService.getUserPermissionCodes().subscribe(
                    res=>{
                        if(this.loginRedirectUrl){
                            //console.log(this.loginRedirectUrl)
                              const urlParts = this.loginRedirectUrl.split("?")
                            
                              if(!this.loginRedirectUrl.includes('?')){
                                  this.router.navigate([this.loginRedirectUrl]);
                              }else{
                                  const uri = urlParts[0]
                                  const queryParams = urlParts[1];
                                  const title = queryParams.split("=")[1];
                                  this.router.navigate([uri], { queryParams: { title: title } });
                              }
                              
                            }else{
                                this.router.navigate(['/home']);
                            }
                    }
                )
              )*/
             
              
              if(isPlatformBrowser(this.platformId)){
                  //this.webSocektSerice.onConnectWebSocekt(this.token);
                  //this.webSocektSerice.joinRoom();
                  this.setExpirationTimer(remainningTime/1000);
              }

              //this.accountsService.getMyUserProfile();

              //this.updateUserPushSubScription(this.userId)?.subscribe();
              
          }else{
              this.logout();
          }
      }
      else{
          if(isPlatformBrowser(this.platformId)){
              //this.webSocektSerice.onConnectWebSocekt(this.token!);
              //this.webSocektSerice.joinRoom();
          }
          return;
      }

  }

  loadLoginUser(){
    //const loginUser = this.cookie.get('userprofile')
     
    
  }

  private setExpirationTimer(duration:number){
      this.tokenTimer = setTimeout(()=>{
          this.logout();
      }, duration * 1000)
  }



  public getAuthData(){
      const token = this.cookie.get("token");
      const expirationDate = this.cookie.get("expirationDate");
      //const userId = this.cookie.get("userId");
      //const role = this.cookie.get("role");
      if(!token || !expirationDate) return;

      return {
          token:token,
          expirationDate: new Date(expirationDate),
          //userId:userId,
          //role:role
      }
  }


  logout(path?:string){
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      //this._accountsService.emitLoginUser(null)
      this.userId="";
      this.clearAuthData();
      //this.accountsService.loginUserListener.next(null);

      if(isPlatformBrowser(this.platformId)){
          //this.webSocektSerice.onDisconnect();
      }
      
      if(this.tokenTimer){
          clearTimeout(this.tokenTimer);
      }
      if(path){
          this.router.navigate([path]);
      }else{
          this.router.navigate(["/"]);
      }
      
  }


  private saveAuthData(token:string, expirationDate:Date, tenant:string){
    this.cookie.put("token", token);
    this.cookie.put("tenant", tenant);
    this.cookie.put("expirationDate", expirationDate.toISOString());
}

  private clearAuthData(){
    this.cookie.remove("token");
    this.cookie.remove("expirationDate");
    this.cookie.remove('userprofile');
    this._accountsService.emitNullUser()
}


  getLogingActivities(){
      //return this.http.get<LoginActivity[]>(this.BASE_URL + "login-activities/all");
  }


  updateUserPushSubScription(userId:string){
     const pushSubscription = this.cookie.get("pushSubscription"); 
     if(pushSubscription){
         const pushSubscriptionAsJson = JSON.parse(pushSubscription);
         const data = {userId:this.userId, subscriptionData:pushSubscriptionAsJson}
         return this.http.post(this.ROOT_BASE_URL + "/welcome/push-subscriptions/update", data);
     }else{
         return;
     }
  }

}
