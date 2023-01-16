import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, 
    private cookie:CookieService, 
    private router:Router){}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
        const token = this.cookie.get("token");
        const isAuth = token? true : false;
  
        if(!isAuth){
          const previousUrl = state.url;
          this.authService.loginRedirectUrl = previousUrl;
          return this.router.createUrlTree(['/auth']); 
        }
        return true;
      
    }
  
}
