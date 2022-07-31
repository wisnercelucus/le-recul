import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vn-hotel-banner',
  templateUrl: './hotel-banner.component.html',
  styleUrls: ['./hotel-banner.component.scss']
})
export class HotelBannerComponent implements OnInit {

  sliderImages = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1460627390041-532a28402358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1622899505135-694e8ccffce8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'person2',
    },
  ]



  images = [
    {
      id: new Date().getTime().toString(),
      name: 'Wifi',
      url: 'https://images.unsplash.com/photo-1534612899740-55c821a90129?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      alt: 'Internet sans fil gratuit',
      desc: `À l’Hôtel Le Recul, on connaît l’importance d’une bonne connexion Internet.`,
      icon: 'wifi'
    },
    {
      id: new Date().getTime().toString(),
      name: 'Piscine',
      url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      alt: 'Piscine',
      desc: `La piscine bénéficie d’un ensoleillement exceptionnel et d’un calme absolu.`,
      icon: 'pool'
    },
    {
      id: new Date().getTime().toString(),
      name: 'Transport',
      url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
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


  imagesPointForm = [
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

}
