import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  icon?:string;
  title:string;
  message:string;
  isSuccess?:boolean;
}

@Component({
  selector: 'app-general-confirm',
  templateUrl: './general-confirm.component.html',
  styleUrls: ['./general-confirm.component.scss']
})
export class GeneralConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { 

  }

  ngOnInit(): void {
  }

}
