import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ScrollOnNavigationService{
    timer: any;
    constructor(@Inject(PLATFORM_ID) private plateformId: Object, private _router: Router){}

    scrollTo(id:string){
        if(isPlatformBrowser(this.plateformId)){
          if(document.getElementById(id)){
            document.getElementById(id)!
            .scrollIntoView({behavior: 'smooth'});
          }else{
            return;
          }
        }
      }
    
      navigateTo(id:string, route:string){
        if(isPlatformBrowser(this.plateformId))
        {
          if(window.location.pathname == route){
            this.scrollTo(id);
            
          }else{
            this._router.navigate([route])
            this.timer = setTimeout( () =>{
                this.scrollTo(id);
                clearTimeout(this.timer)
            }, 500);
          } 
        }else{
          return;
        }
      }
}