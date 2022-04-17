import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vn-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  date = new Date("Dec 5, 2022 15:37:25")
  constructor() { }

  ngOnInit(): void {
  }

}
