import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vn-latest-shows',
  templateUrl: './latest-shows.component.html',
  styleUrls: ['./latest-shows.component.scss']
})
export class LatestShowsComponent implements OnInit {
 shows = [
   {img: 'assets/logo/Valery-Numa.png', title: "Jean Paul Garcia", type: "Invite du Jour", date: new Date(), platform: "soundcloud", details: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
   Ipsam modi provident ratione ullam, ut maxime non, 
   deserunt laudantium placeat sequi sint esse alias iure expedita delectus aspernatur at aliquid illum?`},
   
   {img: 'assets/logo/logo-vn.jpg', title: "Wisner Celucus", type: "Vision 200 a l'ecoute", date: new Date(), platform: "youtube", details: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
   Ipsam modi provident ratione ullam, ut maxime non,`},

   {img: 'assets/images/valery-swag.png', title: "Jean Paul Garcia", type: "Invite du Jour", date: new Date(), platform: "soundcloud", details: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
   deserunt laudantium placeat sequi sint esse alias iure expedita delectus aspernatur at aliquid illum?`},
   
      /*
   {title: "Mario Andresol", type: "Vision 200 a l'ecoute", date: new Date(), platform: "youtube"},
   {img: 'assets/images/valery-mike-stand.png', title: "Jean Paul Garcia", type: "Invite du Jour", date: new Date(), platform: "soundcloud", details: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
   Ipsam modi provident ratione ullam, ut maxime non, 
   deserunt laudantium placeat sequi sint esse alias iure expedita delectus aspernatur at aliquid illum?`},
   {title: "Wisner Celucus", type: "Vision 200 a l'ecoute", date: new Date(), platform: "youtube", details: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
   Ipsam modi provident ratione ullam, ut maxime non,`},
   {title: "Jean Paul Garcia", type: "Invite du Jour", date: new Date(), platform: "soundcloud", details: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
   deserunt laudantium placeat sequi sint esse alias iure expedita delectus aspernatur at aliquid illum?`},
   {title: "Mario Andresol", type: "Vision 200 a l'ecoute", date: new Date(), platform: "youtube"},*/
 ]

  constructor() { }

  ngOnInit(): void {
  }

}
