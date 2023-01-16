import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { AccountsService, UserProfile } from '../services/accounts.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profile!: UserProfile;
  username!:string;

  isLoginUser!:boolean;
  isLoading!:boolean;
  loginUser!:UserProfile;

  subs = new SubSink();

  constructor(private route:ActivatedRoute, private router:Router, 
    private _accountService:AccountsService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };

    this.username = this.route.snapshot.paramMap.get("username")!;
    this.getUser(this.username)

    this.isLoginUser = this.loginUser? true:false;

    this.subs.add(this._accountService.loginUser.subscribe((res: any)=>{
      if(res){
        this.isLoginUser = this.profile?.id === res?.id;
        this.loginUser = res;
        if(this.profile)
          this.profile.avatar = res.avatar
      }
    })
    )


  }

  hasPermission(user:UserProfile, loginUser:UserProfile){
    return user.user?.id === loginUser.user?.id;
  }

  getUser(username: string){
    this.subs.add(
      this._accountService.getUserProfileByUsername(username).subscribe(
        (res: any)=> {
          this.profile = res
        }
      )
    )
  }



}
