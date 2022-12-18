import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();
  offerClosed = true
  isAuthenticated = true
  faBuilding = faBuilding
  //notAtAmin = false
  faUser = faUser
  userProfile:any = {user: {name: 'Valery Numa', username: 'valnum'}, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'}
  
  @Input() hotel = false;
  @Input() cinema = false;

  constructor(private _router: Router) { }

  ngOnInit(): void {
        
    this._router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };
     
    //console.log(this._router.events)
  }

  onNavigateHome(path: string){
    this._router.navigate([path])
  }

  onNavigate(path: string){
    this._router.navigate([path])
  }

  onLogout(){
    //this._authServive.logout();
  }

  onToggleSideNave(){
    this.toggleSideNav.emit();
  }

  onCloseSpecialOffer($event: any){
    this.offerClosed = true
  }

  getCompleteUrl(url: string): string{
    if(!url) return ''
  
    const urls = url.split(':')
    if(urls.includes('http') || urls.includes('https')){
      return url
    }else{
      return 'this._utilitiesService.base_url_no_trail + url'
    }
  }

  isActivePath(seg: string[]){
    const url = this._router.url
    const target = url.split('/')[1]
    return seg.includes(target)
  }

  isAdminPath(seg: string[]){
    const url = this._router.url
    const target = url.split('/')[1]
    return seg.includes(target)
  }



}
