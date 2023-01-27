import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/reusable-components/img-galery/img-galery.component';
import { HomeBannerService } from '../hotel-landing/hotel-banner/home-banner.service';
import { SubSink } from 'subsink';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'vn-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  subs = new SubSink()

  data: Item[] = [
      {
        imageSrc: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        imageAlt: '1'
      },
    ]
  
  constructor(private _homeBannerService: HomeBannerService) { }

  ngOnInit(): void {
    this.getgalleryHomeDetails('gallery')
  }

  getgalleryHomeDetails(model: string){
    this.subs.add(this._homeBannerService.getHomeGallryImages(model).subscribe({
      next: (res: any)=>{
        this.data = [...res.gallery_images]
        
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    }))
  }

}
