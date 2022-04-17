import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'vn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();
  
  @Input() hotel = false;
  @Input() cinema = false;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  onNavigateHome(path: string){
    this._router.navigate([path])
  }

  onNavigate(path: string){
    this._router.navigate([path])
  }

  onToggleSideNave(){
    this.toggleSideNav.emit();
  }

}
