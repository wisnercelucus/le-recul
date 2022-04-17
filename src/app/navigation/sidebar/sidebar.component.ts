import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vn-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() sidenavClose:EventEmitter<void> = new EventEmitter<void>();

  @Input() hotel = false;
  @Input() cinema = false;
  timer:any;
  
  constructor(private _router:Router, @Inject(PLATFORM_ID) private plateformId:Object) { }

  ngOnInit(): void {
  }

  onCloseSideNav(){
    this.sidenavClose.emit();
  }

  onLogout(){
    //this.authServive.logout();
    this.onCloseSideNav();
  }

  onNavigateHome(path: string){
    this._router.navigate([path])
  }


  scrollTo(id:string){
    return;
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
        this.onCloseSideNav();
        this.scrollTo(id);
        
      }else{
        this._router.navigate([route]);
        this.onCloseSideNav();
        /*.then(
          () =>{
               this.timer = setTimeout( () =>{
               this.onCloseSideNav();
               this.scrollTo(id);
               clearTimeout(this.timer)
            }, 700); 
          }
        )*/
      } 
    }else{
      return;
    }
  }

}
