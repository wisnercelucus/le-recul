import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/error-handler.service';
import { GeneralConfirmComponent } from 'src/app/my-dialogs/dialogs/general-confirm/general-confirm.component';
import { RoutingService } from 'src/app/routing.service';
import { SubSink } from 'subsink';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-account-password-forms',
  templateUrl: './account-password-forms.component.html',
  styleUrls: ['./account-password-forms.component.scss']
})
export class AccountPasswordFormsComponent implements OnInit {
  subs = new SubSink()
  record: any;    
  username!: string;
  hide1=true;
  hide=true;
  hide2=true;

  constructor(private _accountsService: AccountsService, 
    private dialog: MatDialog,
    private _errorhandler:ErrorHandlerService,
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

    const password = f.value['password']
    const password_confirm = f.value['password_confirm']

    //console.log(password, password_confirm)

    let context = this._errorhandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
    'Password changed sucessfully. Please login with your new password.', 
    'The two passwords do not match. Please verify and try again.'
)
    if(password !== password_confirm){
      this.openDialog(false, context);
      return
    }


    const data = f.value
    if(this.editByUsername()){
      this.subs.add(
        this._accountsService.updateUserPassword(data, this.username).subscribe(
          res=>{
            this._routingService.onNavigateToUserProfile('accounts', this.username)
          }
        )
      )
    }

    }


  getRecordToUpdateByUsername(username: string){
    this.subs.add(
      this._accountsService.getUserProfileByUsername(username).subscribe(
        res=> {this.record = res
          console.log(res)
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

  openDialog(success: boolean, context: any): void {
    this.dialog.open(GeneralConfirmComponent,
      {
        data: this._errorhandler.getDialogContext(success, context)
      })
  }

}
