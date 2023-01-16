import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Output() userLogout = new EventEmitter<void>();
  @Input() loginUser!: any;
  fullName!:string;

  constructor(private _router:Router, private _utilitiesService: UtilitiesService) { }

  ngOnInit(): void { 
    //console.log(this.loginUser)
  }

  getFullName(): string{
    //this.fullName = this.loginUser?.first_name + ' ' + this.loginUser?.last_name;
    
    if(this.fullName.length <= 21){
      return this.fullName;
    }
    return this.fullName.substring(0, 18) + '...';
  }



  onLogout(){
    this.userLogout.emit()
  }

  onGotoProfile(username: string){
    this._router.navigate(['/accounts', username])
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


}
