import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vn-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  y = new Date().getFullYear()
  
  constructor() { }

  ngOnInit(): void {
  }

}
