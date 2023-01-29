import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http'
import { CookieService } from 'ngx-cookie';


@Injectable()
export class LanguangeInterceptorService implements HttpInterceptor {

  constructor(@Inject(LOCALE_ID) private localeId: string, private cookie:CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
   // const lang = this.cookie.get("lang") || 'en';

    req = req.clone({
        setHeaders:{
            'Accept-Language': this.localeId
        }
    })

    // console.log(lang)

    return next.handle(req)
  }

  
}