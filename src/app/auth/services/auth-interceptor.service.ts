import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private _cookie: CookieService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this._cookie.get("token");

      if(!token){
        return next.handle(req);
      }
      
      if(req.url.split('/').includes('password_reset') || 
          req.url.split('/').includes('validate_token')
      ){
        return next.handle(req);
      }
      
      const authRequest = req.clone({
          headers:req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(authRequest);
  }
}
