import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/routing.service';

@Component({
  selector: 'app-record-owner',
  templateUrl: './record-owner.component.html',
  styleUrls: ['./record-owner.component.scss']
})
export class RecordOwnerComponent implements OnInit {
  @Input() record_meta!: {owner: {name: string, uuid: string, username: string}, 
                                  updated_by: {name: string, uuid: string, 
                                    username: string}, created_at: string|null, updated_at: string|null}
  constructor(
    private _routingService: RoutingService
  ) { }

  ngOnInit(): void {
    //console.log( this.record_meta)
  }

  onNavigateToUser(username: string){
    this._routingService.onNavigateToUserProfile('accounts', username)
  }



}
