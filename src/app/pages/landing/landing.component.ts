import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vn-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  lasteShowStyle = {'background-color': "#ffffff" /*, 'background-image': 'linear-gradient(to right, #000000, #ffffff)'*/};
  
  blogsStyleClass = {
  'background-image': 'linear-gradient(to right, rgba(41, 58, 74, .85), rgba(41, 58, 74, .85)), url(/assets/images/bg-blog-fit.png)',
  'background-position': 'center',
  'background-size': 'cover',
  'background-repeat': 'no-repeat'
  }

  mediaStyleClass = {
    'background-image': 'linear-gradient(to right, rgba(41, 58, 74, .85), rgba(41, 58, 74, .85)), url(/assets/images/bg-blog-fit.png)',
    'background-position': 'center',
    'background-size': 'cover',
    'background-repeat': 'no-repeat'
    }

  constructor() { }

  ngOnInit(): void {
  }

}
