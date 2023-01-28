import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { faImages, faUser, faUserShield, faBed } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ScrollOnNavigationService } from 'src/settings/utilities/scrollonnavigation';
import { SubSink } from 'subsink';

@Component({
  selector: 'vn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();
  offerClosed = true
  isAuthenticated = false
  faImages = faImages
  faUserShield = faUserShield
  faBed = faBed
  //notAtAmin = false
  languages: any[] = []
  faUser = faUser
  subs = new SubSink()
  userProfile:any = {user: {name: 'Valery Numa', username: 'valnum'}, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'}
  
  @Input() hotel = false;
  @Input() cinema = false;

  constructor(private _router: Router,
    private cookie: CookieService,
    
    private _scrollOnNavigationService: ScrollOnNavigationService,
    private _utilitiesService: UtilitiesService, 
    @Inject(PLATFORM_ID) private plateformId: Object,
    public appService: AppService,
    private _accountsService: AccountsService, private _authServive: AuthService) { }

  ngOnInit(): void {
    this.languages = this.appService.LANGUAGES;
        
    this._router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };
     
     this.isAuthenticated = this._authServive.getIsAuth();
        
     this.subs.add(
       this._authServive.getAuthStatusListener().subscribe(res=>{
         this.isAuthenticated = res;
       })
     )
 
     this.subs.add(
       this._accountsService.loginUser.subscribe(res=>{
         //console.log(res)
         this.userProfile=res
       })
       )
  }

  onNavigateHome(path: string){
    this._router.navigate([path])
  }

  onNavigate(path: string){
    this._router.navigate([path])
  }

  onLogout(){
    this._authServive.logout();
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
      return this._utilitiesService.base_url_no_api + url
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

  onMakeReservation(id: string){
    this._scrollOnNavigationService.navigateTo(id, '/')
  }

  onChangeLang(value:string){
    this.cookie.put("lang", value);
    if(isPlatformBrowser(this.plateformId)){
      window.location.reload();
    }
    
  }



}
