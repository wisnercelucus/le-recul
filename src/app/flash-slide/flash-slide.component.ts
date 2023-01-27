import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'vn-flash-slide',
  templateUrl: './flash-slide.component.html',
  styleUrls: ['./flash-slide.component.scss']
})
export class FlashSlideComponent implements OnInit {
  @Input() slideTitle = ''

  @Input() images: any[] = [

  ];

  constructor(private _utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    autoWidth: false,
    dots: false,
    navSpeed: 700,
    center: false,
    navText: ['', ''],
    //responsive: false,
    responsive: {
      0: {
        items: 1
      },
      600:{
        items: 1
      },
      900: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
    nav: false
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
