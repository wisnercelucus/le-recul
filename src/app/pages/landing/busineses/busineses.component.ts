import { Component, OnInit } from '@angular/core';
import { faCoffee, faFilm, faMicrophone, faHotel, faUtensilSpoon } from '@fortawesome/free-solid-svg-icons';
//import {  } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'vn-busineses',
  templateUrl: './busineses.component.html',
  styleUrls: ['./busineses.component.scss']
})
export class BusinesesComponent implements OnInit {

  faCoffee = faCoffee;
  faFilm = faFilm;
  faMicrophone = faMicrophone;
  faHotel = faHotel;
  faUtensilSpoon = faUtensilSpoon;

  constructor() { }

  ngOnInit(): void {
  }

}
