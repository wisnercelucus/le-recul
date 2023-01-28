import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http'
import { CookieService } from 'ngx-cookie';


@Injectable()
export class LanguangeInterceptorService implements HttpInterceptor {

  constructor(private cookie:CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const lang = this.cookie.get("lang") || 'en';

    req = req.clone({
        setHeaders:{
            'Accept-Language':lang
        }
    })

    // console.log(lang)

    return next.handle(req)
  }

  
}