import { Component, Input, OnInit } from '@angular/core';
import { SideNavToggle } from '../shares/animated-side-bar/dynamic-side-nav/dynamic-side-nav.component';

@Component({
  selector: 'vn-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Input() screenWidth = 0;
  @Input() collapsed = false;
  title = 'Le Recul Hotel'

  constructor() { }

  ngOnInit(): void {
  }



  getHomeClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'home-trimed'
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'home-md-screen'
      
    }
    return styleClass
  }

  onToggleSideNav(data: SideNavToggle){
    this.screenWidth = data.screenWidth;
    this.collapsed=data.collapsed;
  }

}
