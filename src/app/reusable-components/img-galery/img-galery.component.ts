import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { faTimes, faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";



export interface Item {
  imageSrc: string;
  imageAlt: string;

}

@Component({
  selector: 'vn-img-galery',
  templateUrl: './img-galery.component.html',
  styleUrls: ['./img-galery.component.scss'],
  animations: [
    trigger("animation", [
      transition('void => visible', [
        style({transform: 'scale(0.5)'}),
        animate('150ms', style({transform: 'scale(1)'}))
      ]),
      transition('visible => void', [
        style({transform: 'scale(1)'}),
        animate('150ms', style({transform: 'scale(0.5)'}))
      ])
    ]),

    trigger("animation2", [
      transition(':leave', [
        style({opacity: 1}),
        animate('50ms', style({opacity: 0.8}))
      ])
    ])

  ]
})
export class ImgGaleryComponent implements OnInit {
  @Input() galleryData: Item[] = [];
  @Input() showCount = false;

  faTimes = faTimes;
  faArrowAltCircleLeft  = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight; 

  previewImage = false;
  showMask = false;
  currentLightboxImage = this.galleryData[0];
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;

  constructor() { }

  ngOnInit(): void {
    this.totalImageCount = this.galleryData.length;
  }

  onPreviewImgage(index: number): void{
    this.showMask = true;
    this.previewImage = true;

    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index];
  }

  onAnimationEnd(event:AnimationEvent){
    if(event.toState === 'void'){
      this.showMask = false;
    }
  }

  onClosePreview(){
    this.previewImage = false;
  }

  prev(): void{
    this.currentIndex = this.currentIndex - 1;
    if(this.currentIndex < 0){
      this.currentIndex = this.galleryData.length - 1;
    }

    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }

  next(): void{
    this.currentIndex = this.currentIndex + 1;
    if(this.currentIndex === this.galleryData.length){
      this.currentIndex = 0;
    }

    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }
}
