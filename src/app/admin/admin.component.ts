import { Component, Input, OnInit } from '@angular/core';
import { SideNavToggle } from '../shares/animated-side-bar/dynamic-side-nav/dynamic-side-nav.component';
import { INavData } from '../shares/animated-side-bar/dynamic-side-nav/side-nav-data';

@Component({
  selector: 'vn-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Input() screenWidth = 0;
  @Input() collapsed = false;
  title = 'Le Recul'



  navdata: INavData[] = [
    {
        routerLink: "/admin",
        icon: "fal fa-home",
        label: "Dashboard"
    },

    {
      routerLink: "/admin/rooms",
      icon: "fas fa-bed",
      label: "Rooms",
    },
    {
      routerLink: "/admin/customers",
      icon: "fas fa-user-tie",
      label: "Customers",
    },

    {
      routerLink: "/admin/roomservices",
      icon: "fab fa-hotjar",
      label: "Room Services",
    },

    {
      routerLink: "/admin/coupons",
      icon: "fas fa-clipboard-list-check",
      label: "Coupons",
    },

    {
      routerLink: "/admin/specialoffers",
      icon: "fas fa-money-check-edit",
      label: "Special Offers",
    },


    {
      routerLink: "/admin/bookings",
      icon: "far fa-cash-register",
      label: "Bookings",
    },

    {
      routerLink: "/admin/accounts",
      icon: "far fa-users",
      label: "Accounts",
    },

    {
      routerLink: "/admin/positions",
      icon: "far fa-users",
      label: "Positions",
    }
    ,

    {
      routerLink: "/admin/roles",
      icon: "far fa-users",
      label: "User roles",
    },


    {
      routerLink: "/admin/banners",
      icon: "far fa-users",
      label: "Banner Texts",
    }
    ,
    {
      routerLink: "/admin/activities",
      icon: "far fa-users",
      label: "Nos Activites",
    },

    {
      routerLink: "/admin/strengths",
      icon: "far fa-users",
      label: "Nos Forces",
    },
    {
      routerLink: "/admin/gallery",
      icon: "far fa-users",
      label: "Gallery",
    },
    {
      routerLink: "/admin/services",
      icon: "far fa-users",
      label: "Nos Services",
    },
    {
      routerLink: "/admin/kitchen",
      icon: "far fa-users",
      label: "La Cuisine",
    }
    
]

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
