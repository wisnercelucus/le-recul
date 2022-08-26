import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

export const Languages =[
  {language: 'English', flag: 'us'},
  {language: 'French', flag: 'france'}
]

export const Notifications =[
  {
    icon: 'far fa-cloud-download', 
    subject: 'Download complete', 
    description: 'Some short content to display ....'
  },
  {
    icon: 'far fa-cloud-upload', 
    subject: 'Upload complete', 
    description: 'Some short content to display ....'
  },
  {
    icon: 'far fa-trash', 
    subject: '350 MB files trashed', 
    description: 'Some short content to display ....'
  }
]

export const userItems = [
  {
    icon: 'far fa-user',
    label: 'Profile',
  },

  {
    icon: 'far fa-cog',
    label: 'Settings',
  },

  {
    icon: 'far fa-unlock-alt',
    label: 'Lock screen',
  },

  {
    icon: 'far fa-power-off',
    label: 'Logout',
  },
]

@Component({
  selector: 'app-custom-topbar',
  templateUrl: './custom-topbar.component.html',
  styleUrls: ['./custom-topbar.component.scss']
})
export class CustomTopbarComponent implements OnInit {

  @Input() collapsed = false
  @Input() screenWidth = 0

  languages = Languages
  selectedLanguage: any;
  notifications = Notifications
  userItems = userItems

  canShowSearchAsOverlay=false

  @HostListener("window:resize", ["$event"])
  onScreenResize(event: any){
    if(isPlatformBrowser(this.platformId)){
      this.checkCanShowSearchAsOverlay(window.innerWidth)
    }
  }


  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.checkCanShowSearchAsOverlay(window.innerWidth)
    }

    this.selectedLanguage=this.languages[0]
      
  }

  getHeadClass(): string{
    let styleClass = ''

    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'head-trimmed'
    }else{
      styleClass = 'head-md-screen'
    }

    return styleClass

  }

  checkCanShowSearchAsOverlay(innerWidth: number){
    if(innerWidth < 845){
      this.canShowSearchAsOverlay = true
    }else[
      this.canShowSearchAsOverlay = false
    ]
  }

}
