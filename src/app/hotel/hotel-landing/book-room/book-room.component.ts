import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faHome, faSmile } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'subsink';
import { BookRoomService } from './book-room.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTablesService } from 'src/app/data-tables/data-tables.service';
import { ROOMATES } from 'src/settings/utilities/config';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'vn-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit, OnDestroy {
  today = today
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    room: new FormControl(''),
    n_roomates: new FormControl(''),
    start_on: new FormControl(new Date()),
    end_on: new FormControl(),
  });


  faHome = faHome;
  faSmile = faSmile;

  rooms: any[] = []
  roomates = ROOMATES

  subs = new SubSink()
  

  //title = "Drawer"

  position = ""
  visible = false
  
  constructor(private _bookRoomService: BookRoomService, private _datatableService: DataTablesService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.getRoomsForForm('rooms')
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

  getRoomsForForm(model: string): void{
    this.subs.add(
      this._datatableService.getDataForForms(model).subscribe({
        next: (res: any[])=>{
          this.rooms = [...res]
        },
        error: (err: HttpErrorResponse)=>{
          console.log(err.error)
        }
      })
    )
  }


  onSubmit(f:FormGroup): void{
    const data = f.value
    //console.log(data)
    this.subs.add(this._bookRoomService.doPost('home', data).subscribe({
      next: (res: any) =>{
        //console.log(res)
        f.reset()
        Object.keys(f.controls).forEach(key =>{
          f.controls[key].setErrors(null)
       });
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err.error)
      }
    }))
    
  }

}
