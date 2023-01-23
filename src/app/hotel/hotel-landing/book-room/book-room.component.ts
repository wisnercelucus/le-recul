import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faHome, faSmile } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'subsink';
import { BookRoomService } from './book-room.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTablesService } from 'src/app/data-tables/data-tables.service';
import { ROOMATES } from 'src/settings/utilities/config';
import { openAnimatedSwalDialog } from 'src/settings/utilities/functions';
import { ErrorHandlerService } from 'src/app/error-handler.service';

const today = new Date();


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

  openAnimatedSwalDialog = openAnimatedSwalDialog

  faHome = faHome;
  faSmile = faSmile;

  rooms: any[] = []
  roomates = ROOMATES

  subs = new SubSink()
  

  //title = "Drawer"

  position = ""
  visible = false
  
  constructor(private _bookRoomService: BookRoomService,
    private _errorHandlerService: ErrorHandlerService,
    private _datatableService: DataTablesService) { }
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
        this.openAnimatedSwalDialog('Saved with success', 'We have received your reservation. Please visit your mail box for the confirmation.', 'success')
        f.reset()
        Object.keys(f.controls).forEach(key =>{
          f.controls[key].setErrors(null)
       });
      },
      error: (err: HttpErrorResponse)=>{
        const errorMessage = this._errorHandlerService.getErrorMessage(err)
        this.openAnimatedSwalDialog('Ooops...', errorMessage, 'error')
      }
    })
    
    )
    
  }

}
