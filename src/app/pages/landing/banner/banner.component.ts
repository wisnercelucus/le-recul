import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'vn-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  onNavigate(path: string): void{
    this._router.navigate([path])
  }

}
