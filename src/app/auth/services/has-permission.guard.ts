import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { SubSink } from 'subsink';
import { AuthService } from './auth.service';
import { getModelToQuery } from 'src/settings/utilities/functions';

@Injectable({
  providedIn: 'root'
})
export class HasPermissionGuard implements CanActivate , OnDestroy {
  subs = new SubSink()
  getModelToQuery = getModelToQuery

  constructor(private _accountsService:AccountsService, 
    private _authService: AuthService,
    private router:Router){   
    }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }


    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const attmpt_url = state.url
        const SAFE_URLS = ['accounts', 'home', 'register']

        if(SAFE_URLS.includes(attmpt_url.split('/')[1])){
          return true
        }

        const attemt_url_parts = attmpt_url.split('/')
        const modelI = attemt_url_parts[1]
        
        if(attemt_url_parts.length === 2){
          return true
        }

        const action = attemt_url_parts[2]

        if(!['new', 'edit'].includes(action) || (!attemt_url_parts.includes('edit') && !attemt_url_parts.includes('new') )){
          return true
        }

        let act = ''
        if(action === 'new'){
          act = 'add'
        }else if (action === 'edit'){
          act = 'change'
        }

        const model = this.getModelToQuery(modelI)
        const perm = `${act}_${model}`

        const data = {perm: perm}     
        return new Observable<boolean>(obs => {
          this._accountsService.checkPermission(data).subscribe(
            {
              next: data => {
                
                if (!data.has_permission) {
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
