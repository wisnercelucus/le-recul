import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeBannerService } from '../hotel-landing/hotel-banner/home-banner.service';
import { SubSink } from 'subsink';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'vn-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {
  subs = new SubSink()

  //Internet sans fil gratuit
  //À l’Hôtel Le Recul, on connaît l’importance d’une bonne connexion Internet.

  //Piscine
  //La piscine bénéficie d’un ensoleillement exceptionnel et d’un calme absolu.

  //Transport
  //Réservations de taxis, transferts aéroports, restaurants, spectacles, visites touristiques…

  //Parking Gratuit
  //Nous mettons à votre disposition gratuitement notre parking dans l’hôtel.

  images: any[] = [
    {
      id: new Date().getTime().toString(),
      name: 'Wifi',
      featured_image: 'assets/services/Internetsansfil-768x512.jpg',
      image_alt: 'Internet sans fil gratuit',
      description: `À l’Hôtel Le Recul, on connaît l’importance d’une bonne connexion Internet.`,
      material_icon_code: 'wifi'
    },
    {
      id: new Date().getTime().toString(),
      name: 'Piscine',
      featured_image: 'assets/services/Piscine_lerecul-768x512.jpg',
      image_alt: 'Piscine',
      description: `La piscine bénéficie d’un ensoleillement exceptionnel et d’un calme absolu.`,
      material_icon_code: 'pool'
    },
    {
      id: new Date().getTime().toString(),
      name: 'Transport',
      featured_image: 'assets/services/transport_lerecul-768x512.jpg',
      image_alt: 'Transport',
      description: 'Réservations de taxis, transferts aéroports, restaurants, spectacles, visites touristiques...',
      material_icon_code: 'airport_shuttle'
    },

    {
      id: new Date().getTime().toString(),
      name: 'Parking Gratuit',
      featured_image: 'assets/services/parking_lerecul-768x512.jpg',
      image_alt: 'Parking Gratuit',
      description: `Nous mettons à votre disposition gratuitement notre parking dans l’hôtel.`,
      material_icon_code: 'local_parking'
    },
  ];

  constructor(private _homeBannerService: HomeBannerService, private _utilitiesService: UtilitiesService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.getServices('services')
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

  getServices(model: string){
    this.subs.add(this._homeBannerService.getHomeBannerDetails(model).subscribe({
      next: (res: any)=> {
        this.images = [...res]
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err)
      }
    }))
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
