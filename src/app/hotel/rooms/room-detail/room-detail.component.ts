import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ROOMATES } from 'src/settings/utilities/config';
import { SubSink } from 'subsink';
import { BookRoomService } from '../../hotel-landing/book-room/book-room.service';
import { ActivatedRoute } from '@angular/router';
import { RecordDetailsService } from 'src/app/record-details/services/record-details.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { openAnimatedSwalDialog } from 'src/settings/utilities/functions';
import { ErrorHandlerService } from 'src/app/error-handler.service';
import { ScrollOnNavigationService } from 'src/settings/utilities/scrollonnavigation';

const today = new Date();


type Rating = {
  value: number;
  max: number;
  color?: ThemePalette;
  disabled?: boolean;
  dense?: boolean;
  readonly?: boolean;
};


@Component({
  selector: 'vn-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  subs = new SubSink()
  openAnimatedSwalDialog = openAnimatedSwalDialog
  
  today = today
  form: FormGroup = new FormGroup({
    fullname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    room: new FormControl(''),
    n_roomates: new FormControl('', Validators.required),
    start_on: new FormControl(new Date()),
    end_on: new FormControl('', Validators.required),
  });

  room : any;
  record_id!: string;

  roomates = ROOMATES
  
  constructor(private _bookRoomService: BookRoomService, 
    private _errorHandlerService: ErrorHandlerService,
    private _scrollOnNavigationService: ScrollOnNavigationService,
    private _utilitiesService: UtilitiesService, 
    private _recordDetailsService: RecordDetailsService, 
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.record_id = this._route.snapshot.paramMap.get('room_uuid')!
    this.getRecordDetail('rooms', this.record_id)
  }

  rating: Rating = {
    value: 4,
    max: 5,
    color: "accent",
    dense: false,
    readonly: true
  }


  getRecordDetail(model: string, uuid: string): void{
    this.subs.add(
      this._recordDetailsService.getRecordDetailAnonymously(model, this.record_id).subscribe({
        next: (res: any[])=>{
          this.room = {...res}
          //console.log(this.room)
        },
        error: (err: HttpErrorResponse)=>{
          console.log(err.error)
        }
      })
    )
  }

  onSubmit(f:FormGroup): void{
    const data = f.value
    data['room'] = this.room.id
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

  truncateHTML(text: string, length: number): string {

    let charlimit = length;
    if(!text || text.length <= charlimit )
    {
        return text;
    }


  let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
  let shortened = without_html.substring(0, charlimit) + "...";
  return shortened;
}

getCompleteUrl(url: string): string{
  if(!url) return ''

  const urls = url.split(':')
  if(urls.includes('http') || urls.includes('https')){
    return url
  }else{
    return this._utilitiesService.base_url_no_api + url
  }
}

onMakeReservation(id: string, r_uuid:string){
  this._scrollOnNavigationService.navigateTo(id, `/rooms/${r_uuid}/details`)
}
}
