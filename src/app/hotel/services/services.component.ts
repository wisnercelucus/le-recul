import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'vn-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  //Internet sans fil gratuit
  //À l’Hôtel Le Recul, on connaît l’importance d’une bonne connexion Internet.

  //Piscine
  //La piscine bénéficie d’un ensoleillement exceptionnel et d’un calme absolu.

  //Transport
  //Réservations de taxis, transferts aéroports, restaurants, spectacles, visites touristiques…

  //Parking Gratuit
  //Nous mettons à votre disposition gratuitement notre parking dans l’hôtel.

  images = [
    {
      id: new Date().getTime().toString(),
      name: 'Wifi',
      url: 'assets/services/Internetsansfil-768x512.jpg',
      alt: 'Internet sans fil gratuit',
      desc: `À l’Hôtel Le Recul, on connaît l’importance d’une bonne connexion Internet.`,
      icon: 'wifi'
    },
    {
      id: new Date().getTime().toString(),
      name: 'Piscine',
      url: 'assets/services/Piscine_lerecul-768x512.jpg',
      alt: 'Piscine',
      desc: `La piscine bénéficie d’un ensoleillement exceptionnel et d’un calme absolu.`,
      icon: 'pool'
    },
    {
      id: new Date().getTime().toString(),
      name: 'Transport',
      url: 'assets/services/transport_lerecul-768x512.jpg',
      alt: 'Transport',
      desc: 'Réservations de taxis, transferts aéroports, restaurants, spectacles, visites touristiques...',
      icon: 'airport_shuttle'
    },

    {
      id: new Date().getTime().toString(),
      name: 'Parking Gratuit',
      url: 'assets/services/parking_lerecul-768x512.jpg',
      alt: 'Parking Gratuit',
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
