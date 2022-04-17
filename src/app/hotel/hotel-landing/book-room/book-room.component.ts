import { Component, OnInit } from '@angular/core';
import { faHome, faSmile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vn-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit {
  faHome = faHome;
  faSmile = faSmile;

  rooms = ["Chambre VIP", "Chambre Double", "Chambre Famille", "Chambre Simple",]
  roomates = ["1 Adulte", "2 Adultes", "3 Adultes", "4 Adulte", "5 Adultes", "6 Adultes",]

  


  title = "Drawer"

  position = ""
  visible = false
  
  constructor() { }

  ngOnInit(): void {
  }

  onDrawerHide(){}

  setVisibility(position: string){
    this.visible = true
    this.position = position
  }

  toggleVisibility(position: string){
    this.visible = !this.visible;
    this.position = position
  }



}
