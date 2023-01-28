import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Event, Router } from '@angular/router';
import { SubSink } from 'subsink';
//import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth/services/auth.service';
import { CookieService } from 'ngx-cookie';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  subs = new SubSink()
  isLoading = false;
  hotel = false;

  constructor(
     @Inject(PLATFORM_ID) private platformId: Object,
     private _authServive: AuthService, 
     private cookie: CookieService,
     private appService: AppService,
     private router: Router){
    this.subs.add(
      this.router.events.subscribe((routerEvent: Event)=>{
        if(routerEvent instanceof NavigationStart){
          this.isLoading=true;
        }
        if(routerEvent instanceof NavigationEnd){
          if(isPlatformBrowser(this.platformId)){
            this.hotel = location.pathname.split('/').includes('hotel');
          
          }
          this.isLoading=false;
         /* if (isPlatformBrowser(this.platformId)) {
            gtag('config', 'G-DXW0DYV772', {
              'page_path':routerEvent.urlAfterRedirects
            });
          }/*

          /*var rt = this.getChild(this.activatedRoute)
          rt.data.subscribe(data => {
            console.log(data);
            //this.titleService.setTitle(data.title)
          })*/
        
        }
        if (routerEvent instanceof NavigationCancel) {
          this.isLoading=false;
        }
        if (routerEvent instanceof NavigationError) {
          this.isLoading=false;
        }
      })
      )
  }
  ngOnInit(): void {
    this._authServive.autoAuthUser()
    
    if(isPlatformBrowser(this.platformId)){
      const userLang = navigator.language
      let locale = this.cookie.get("lang") || userLang || 'en';
      this.appService.setLanguages(locale);
      this.appService.setLang(locale)
    }

   

    //translate.use(locale.match(/en|fr|es/) ? locale : 'en');
    

    //AOS.init();
  }
}
