import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { SubSink } from 'subsink';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserHasViewGuard implements CanActivate, OnDestroy {
  subs = new SubSink()

  constructor(private _accountService:AccountsService,
    private _authService:AuthService, 
    private router:Router
    ){


    }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const attmpt_url = state.url
        const SAFE_URLS = [
          'accounts', 
          'home', 
          'register', 
          'tasks', 
          'roles', 
          'approval-requests', 
          'login-activities',
          'todos',
          'positions',
          'frontend-views',
      ]

        if(SAFE_URLS.includes(attmpt_url.split('/')[1])){
          return true
        }

        const root_urls = attmpt_url.split('/')
        const root_url = '/'+ root_urls[1]

        const data = {url: root_url.toString()}

        //console.log(data)
        
        return new Observable<boolean>(obs => {
  
              this._accountService.checkViewPermission(data).subscribe(
                {
                  next: data => {
                    
                    if (!data.has_view) {
                        this.router.navigateByUrl('/home');
                        obs.next(false);
                    }
                    else {
                        obs.next(true);
                    }
                },
                error: (err: HttpErrorResponse)=>{
                  if(err.error){
                    const code = err.error.code
                    if(code === 'user_not_found' || code === 'token_not_valid'){
                      this._authService.logout()
                      obs.next(false)
                    }else{
                      obs.next(false)
                    }
                  }
                }
                }

              );
      });
      
        
      
    }
  
  
}
