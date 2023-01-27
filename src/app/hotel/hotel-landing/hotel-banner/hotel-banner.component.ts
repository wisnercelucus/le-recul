import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScrollOnNavigationService } from 'src/settings/utilities/scrollonnavigation';
import { HomeBannerService } from './home-banner.service';
import { SubSink } from 'subsink';
import { HttpErrorResponse } from '@angular/common/http';
import { CarouselImage } from 'src/app/reusable-components/img-carousal/img-carousal.component';

@Component({
  selector: 'vn-hotel-banner',
  templateUrl: './hotel-banner.component.html',
  styleUrls: ['./hotel-banner.component.scss']
})
export class HotelBannerComponent implements OnInit, OnDestroy {
  subs = new SubSink()
  banner_content: any;

  sliderImages: CarouselImage[] = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1460627390041-532a28402358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1622899505135-694e8ccffce8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'person2',
    },
  ]



  images: any[] = [

  ];


  imagesPointForm: any[] = [


  ];


  constructor(private _scrollOnNavigationService: ScrollOnNavigationService, private _homeBannerService: HomeBannerService) { }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.getBannerHomeDetails('banners')
  }

  onMakeReservation(id: string){
    this._scrollOnNavigationService.navigateTo(id, '/')
  }


  getBannerHomeDetails(model: string){
    this.subs.add(this._homeBannerService.getHomeBannerDetails(model).subscribe({
      next: (res: any)=>{
        this.banner_content = res
        this.sliderImages = [...res.banner_images]
        this.images = [...res['activities']]
        this.imagesPointForm = [...res['strengths']]
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    }))
  }

}
