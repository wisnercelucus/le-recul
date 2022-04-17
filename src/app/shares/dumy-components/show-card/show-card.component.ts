import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vn-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss']
})
export class ShowCardComponent implements OnInit {
  @Input() show: any;

  constructor() { }

  ngOnInit(): void {
  }

}
