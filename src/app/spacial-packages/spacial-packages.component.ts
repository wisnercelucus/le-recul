import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'vn-spacial-packages',
  templateUrl: './spacial-packages.component.html',
  styleUrls: ['./spacial-packages.component.scss']
})
export class SpacialPackagesComponent implements OnInit {
  date = new Date("Dec 22, 2022 15:37:25")
  @Output() closeSpacialPackage = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  onCloseNav(){
    this.closeSpacialPackage.emit()
  }

}
