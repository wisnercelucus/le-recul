import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from 'src/app/routing.service';
import { SubSink } from 'subsink';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-account-idenfifications-forms',
  templateUrl: './account-idenfifications-forms.component.html',
  styleUrls: ['./account-idenfifications-forms.component.scss']
})
export class AccountIdenfificationsFormsComponent implements OnInit {

  subs = new SubSink()
  record: any;    
  username!: string;

  constructor(private _accountsService: AccountsService, 
              private _route:ActivatedRoute,
              private _routingService: RoutingService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {

    this.username = this._route.snapshot.paramMap.get('username')!
  if(this.username){
      this.getRecordToUpdateByUsername(this.username);
    }


  }

  onSubmit(f: NgForm){
    const data = f.value
    if(this.editByUsername()){
      this.subs.add(
        this._accountsService.updateUserIdentifications(data, this.username).subscribe(
          res=>{
            this._accountsService.getMyProfile().subscribe()
            this._routingService.onNavigateToUserProfile('accounts', res.user?.username!)
          }
        )
      )
    }

    }


  getRecordToUpdateByUsername(username: string){
    this.subs.add(
      this._accountsService.getUserProfileByUsername(username).subscribe(
        res=> {this.record = res
          //console.log(res)
        }
      )
    )
  }

  isEditMode(){
    if(this.username){
      return true
    }else{
      return false
    }
  }

  editByUsername(){
    return ![null, undefined, ''].includes(this.username)
    //(this.username !== '' || this.username !== null || this.username !== undefined)
  }

}
