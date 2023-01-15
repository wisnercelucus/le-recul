import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModelLookupDataService } from 'src/app/model-forms/services/model-lookup-data.service';
import { RoutingService } from 'src/app/routing.service';
import { SubSink } from 'subsink';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy {
  sexes: string[] = ['male', 'female', 'other', 'no mention',]
  partners!: any[];
  subs = new SubSink()
  record: any;    
  record_id!: string;
  username!: string;
  model = ''

  constructor(private _accountsService: AccountsService, 
              private _route:ActivatedRoute,
              private _routingService: RoutingService,
              private _modelLookupDataService: ModelLookupDataService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.record_id = this._route.snapshot.paramMap.get('record_id')!
    this.username = this._route.snapshot.paramMap.get('username')!
    this.model = this._route.snapshot.paramMap.get('model')!

    if(this.record_id){
      this.getRecordToUpdate(this.record_id);

    }else if(this.username){
      this.getRecordToUpdateByUsername(this.username);
    }

    this.getLookups('partners')

  }

  onSubmit(f: NgForm){
    const data = f.value
    if(!this.record_id && !this.username){
      this.subs.add(
        this._accountsService.createUser(data).subscribe(
          res=>{
            this._routingService.onNavigateRecordDetails('accounts', res._id)
          }
        )
      )
    }else{
      if(!this.editByUsername()){
        this.subs.add(
          this._accountsService.updateUser(data, this.record_id).subscribe(
            res=>{
                this._routingService.onNavigateRecordDetails('accounts', res._id)
            }
          )
        )
      }else{
        this.subs.add(
        this._accountsService.updateUserByUsername(data, this.username).subscribe(
          res=>{
            this._accountsService.getMyProfile().subscribe()
            this._routingService.onNavigateToUserProfile('accounts', this.username)
          }
        )
      )
      }

    }

    
  }

  getLookups(model: string){
    this.subs.add(this._modelLookupDataService.getFormLookupDataFor(model).subscribe(
      res=>{
        this.partners = res
      }
    )
    )
  }

  getRecordToUpdate(uuid: string){
    this.subs.add(
      this._accountsService.getUserProfile(uuid).subscribe(
        
        res=> {this.record = res
          //console.log(res)
        }
      )
    )
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
    if(this.username || this.record_id){
      return true
    }else{
      return false
    }
  }

  editByUsername(){
    return ![null, undefined, ''].includes(this.username)
    //(this.username !== '' || this.username !== null || this.username !== undefined)
  }

  isUserEdit(model: string): boolean{
    return model === 'accounts';
  }
}
