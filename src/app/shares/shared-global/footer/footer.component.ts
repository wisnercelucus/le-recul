import { Component, OnInit } from '@angular/core';
import { ScrollOnNavigationService } from 'src/settings/utilities/scrollonnavigation';

@Component({
  selector: 'vn-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  y = new Date().getFullYear()
  
  constructor(private _scrollOnNavigationService: ScrollOnNavigationService) { }

  ngOnInit(): void {
  }


  onNavigateTo(id: string, path: string){
    this._scrollOnNavigationService.navigateTo(id, path)
  }
}
