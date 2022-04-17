import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'vn-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  images = [
    {
      id: new Date().getTime().toString(),
      name: 'Vocation',
      url: 'assets/images/movies/papa1.jpeg',
      alt: 'vocation',
      desc: `À l’Hôtel Le Recul, on connaît l’importance d’une bonne connexion Internet.`,
      icon: 'wifi'
    },
    {

      id: new Date().getTime().toString(),
      name: 'Braquages en série',
      url: 'assets/images/movies/braquage.jpeg',
      alt: 'Braquages en série',
      desc: `La piscine bénéficie d’un ensoleillement exceptionnel et d’un calme absolu.`,
      icon: 'pool'
    },
    {
      id: new Date().getTime().toString(),
      name: 'Bye bye papa',
      url: 'assets/images/movies/byebyepapa.jpeg',
      alt: 'Bye bye papa',
      desc: 'Réservations de taxis, transferts aéroports, restaurants, spectacles, visites touristiques...',
      icon: 'airport_shuttle'
    },

    {
      id: new Date().getTime().toString(),
      name: 'Panzou',
      url: 'assets/images/movies/panzou.jpeg',
      alt: 'Panzou',
      desc: `Nous mettons à votre disposition gratuitement notre parking dans l’hôtel.`,
      icon: 'local_parking'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    autoWidth: false,
    dots: false,
    navSpeed: 700,
    center: false,
    navText: ['', ''],
    //responsive: false,
    responsive: {
      0: {
        items: 2
      },
      600:{
        items: 3
      },
      900: {
        items: 4
      },
      1200: {
        items: 4
      }
    },
    nav: false
  }

}
