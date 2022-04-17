import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vn-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() sectionTitle!: string;
  @Input() customStyle: any; //{'background-color': "#ffffff", 'background-image': 'linear-gradient(to right, #000000, #ffffff)'};
  //@Input() bgImgUrl = ""

  constructor() { }

  ngOnInit(): void {
  }

}
