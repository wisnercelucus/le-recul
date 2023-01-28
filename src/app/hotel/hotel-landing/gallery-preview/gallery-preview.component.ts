import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeBannerService } from '../hotel-banner/home-banner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SubSink } from 'subsink';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'vn-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss']
})
export class GalleryPreviewComponent implements OnInit, OnDestroy {
  subs = new SubSink()
  gallery: any

  constructor(private _homeBannerService: HomeBannerService, private _utilitiesService: UtilitiesService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.getGalleryHomeDetails('gallery')
  }

  getGalleryHomeDetails(model: string){
    this.subs.add(this._homeBannerService.getHomeBannerDetails(model).subscribe({
      next: (res: any)=>{
        this.gallery = res
        //console.log(res)
        
      },
      error: (err: HttpErrorResponse) => {
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
