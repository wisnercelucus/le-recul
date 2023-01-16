import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  
  subs = new SubSink()
  constructor(private _accountsService: AccountsService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.subs.add(
      this._accountsService
          .getMyProfile()
              .subscribe(res=>console.log(res))
      )
  }

}
