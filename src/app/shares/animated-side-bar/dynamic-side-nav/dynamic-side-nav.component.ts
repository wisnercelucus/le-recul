import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { navData } from './nav-data';
import { INavData } from './side-nav-data';

export interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dynamic-side-nav',
  templateUrl: './dynamic-side-nav.component.html',
  styleUrls: ['./dynamic-side-nav.component.scss'],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({opacity: 0}),
        animate("350ms",
        style({opacity: 1})
        )
      ]),
      transition(":leave", [
        style({opacity: 1}),
        animate("350ms",
        style({opacity: 0})
        )
      ])
    ]),
    trigger("rotate", [
      transition(":enter", [
        animate("1000ms",
        keyframes(
          [
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
        ]
        ))
      ]),
    ])
  ]
})
export class DynamicSideNavComponent implements OnInit {
  collapsed= false;
  navData = navData;
  screenWidth=0;
  @Input() title = ''
  multiple: boolean = false;

  @Output()
  toggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter()

  @HostListener("window:resize", ["$event"])
  onScreenResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 768){
      this.collapsed = false;
      this.toggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    }
  }

  constructor(@Inject(PLATFORM_ID) private plateformId: Object) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.plateformId)){
      this.screenWidth = window.innerWidth;
      //this.toggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    }
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed
    this.toggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeSideNav(){
    this.collapsed = false;
    this.toggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  handleClick(item: INavData): void{
    if(!this.multiple){
      for(let modelItem of this.navData){
        if(item !== modelItem && modelItem.expanded){
          modelItem.expanded = false
        }
      }
    }
    item.expanded = !item.expanded
  }

}
