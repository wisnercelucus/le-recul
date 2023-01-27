import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { UtilitiesService } from 'src/app/services/utilities.service';

export interface CarouselImage {
  imageSrc: string;
  imageAlt: string;
  id?: number;
  _id?: string;
  image?: string;
  name?: string
}

@Component({
  selector: 'vn-img-carousal',
  templateUrl: './img-carousal.component.html',
  styleUrls: ['./img-carousal.component.scss'],
})
export class ImgCarousalComponent implements OnInit {
  @Input() images: CarouselImage[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;

  @Input() height: any = '';
  @Input() heightPercent: any = '';
  @Input() borderRadius: any;
  @Input() boxShadow: string='';
  @Input() heightRem: any ='';

      //border-radius: 1.5rem;
    //box-shadow: 0 8px 16px #dce1e1;

  selectedIndex = 0;

  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _utilitiesService: UtilitiesService) {}

  ngOnInit(): void {
    //console.log(this.images)
    this.autoSlideImage();
  }

  getCustomImgaStyle(){
    const styles = {
      'height.px': this.height,
      'height.%': this.heightPercent,
      'height.rem': this.heightRem
    }

    return styles
  }

  getContainerStyle(){
    const styles = {
      'border-radius.px': this.borderRadius ? this.borderRadius : '',
      'box-shadow': this.boxShadow ? this.boxShadow : ''
    }

    return styles
  }

  autoSlideImage(){
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        if (this.autoSlide) {
          this.onNext();
        }
      }, this.slideInterval);
    }
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrev() {
    this.selectedIndex = this.selectedIndex - 1;

    if (this.selectedIndex < 0) {
      this.selectedIndex = this.images.length - 1;
    }
  }

  onNext() {
    this.selectedIndex = this.selectedIndex + 1;

    if (this.selectedIndex === this.images?.length) {
      this.selectedIndex = 0;
    }
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
