import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(private appService: AppService) { }

  getLanguage() {
    return this.appService.lang
  }
}
