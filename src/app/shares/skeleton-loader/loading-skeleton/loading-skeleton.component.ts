import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vn-loading-skeleton',
  templateUrl: './loading-skeleton.component.html',
  styleUrls: ['./loading-skeleton.component.scss']
})
export class LoadingSkeletonComponent implements OnInit {
  
  @Input() Cwidth: any;
  @Input() Cheight: any;
  @Input() circle: boolean=false;

  constructor() { }

  ngOnInit() {
  }

  getMyStyles() {
    const myStyles = {
        'width.px': this.Cwidth ? this.Cwidth : '',
        'height.px': this.Cheight ? this.Cheight : '',
        'border-radius': this.circle ? '50%' : ''
    };
    return myStyles;
}

}
