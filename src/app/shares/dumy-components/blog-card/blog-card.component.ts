import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vn-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  @Input() blog: any;
  constructor() { }
 
  ngOnInit(): void {
  }
 
}
