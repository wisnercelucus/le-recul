//import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
//import { throwError } from 'rxjs';

export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'vn-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  //apiData: any;
  //limit: number = 10; // <==== Edit this number to limit API results

  mediaLogos = [
    {
      id: new Date().getTime().toString(),
      name: 'Vision 2000',
      url: 'assets/radio/logo_r_vision_2000.png',
      alt: 'Vision 2000',
    },
    {
      id: new Date().getTime().toString(),
      name: 'Radio Canada',
      url: 'assets/radio/logo_radio_canada-tr.png',
      alt: 'Radio Canada',
    },
    {
      id: new Date().getTime().toString(),
      name: 'Radio Platinum',
      url: 'assets/radio/radio-platinum-live.png',
      alt: 'Radio Platinum Live',
    },

    {
      id: new Date().getTime().toString(),
      name: 'Radio Canada',
      url: 'assets/radio/logo-r-kiskeya-tr.png',
      alt: 'Radio Kiskeya',
    },

    {
      id: new Date().getTime().toString(),
      name: 'Radio Platinum',
      url: 'assets/radio/radio-platinum-live.png',
      alt: 'Radio Platinum Live',
    },
  ];

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
        items: 2
      },
      600:{
        items: 3
      },
      900: {
        items: 4
      },
      1200: {
        items: 4
      }
    },
    nav: false
  }

  constructor(/*private readonly http: HttpClient*/) {}

  ngOnInit() {
    //this.fetch()
  }

  /*fetch() {
    const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    const http$ = this.http.get<PhotosApi>(api);

    http$.subscribe(
      res => this.apiData = res,
      err => throwError(err)
    )
  }*/
}
