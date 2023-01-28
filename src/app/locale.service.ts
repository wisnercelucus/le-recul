import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(private cookie: CookieService) { }

  getLanguage() {
    const userLang = navigator.language
    let locale = this.cookie.get("lang") || userLang || 'en';
    return locale
  }
}
