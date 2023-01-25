import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService, OpenConfirmDialog } from 'src/app/error-handler.service';
import { GeneralConfirmComponent } from 'src/app/my-dialogs/dialogs/general-confirm/general-confirm.component';
import { SubSink } from 'subsink';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.scss']
})
export class PasswordResetConfirmComponent implements OnInit, OpenConfirmDialog {


  form!: FormGroup;
  //tenant!: string;
  subs = new SubSink();
  tokeIsvalid = false;
  token = ''
  hide = true;
  hide1 = true;

  constructor(private _authService: AuthService, 
    private _router: Router,
    private dialog: MatDialog,
    private _errorhandler:ErrorHandlerService,
    private _route:ActivatedRoute) { }

  openDialog(success: boolean, context: any): void {
    this.dialog.open(GeneralConfirmComponent,
      {
        data: this._errorhandler.getDialogContext(success, context)
      })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.token = this._route.snapshot.paramMap.get('token')!

    this.initiateLoginForm();

    if(this.token)
        this.onValidateToken(this.token)
  }

  initiateLoginForm(){
    this.form = new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required]
      }),
      password_confirm: new FormControl('', {
        validators: [Validators.required]
      }),
    });
  }

  onSubmit(){
    const password = this.form.value['password']
    const password_confirm = this.form.value['password_confirm']

    //console.log(password, password_confirm)

    let context = this._errorhandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
    'Password changed sucessfully. Please login with your new password.', 
    'The two passwords do not match. Please verify and try again.'
)
    if(password !== password_confirm){
      this.openDialog(false, context);
      return
    }

    context = this._errorhandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation fail', 
                    'Password changed sucessfully. Please login with your new password.', 
                    'We were not able to change your password. Please contact your admin.'
    )
    this.subs.add(
      this._authService.resetPasswordConfirm(this.token, password).subscribe(
        {
          next: (res)=> {
            this.openDialog(true, context);
            this._router.navigate(['/auth'])
          },
          error: (err)=> {
            const detail = this._errorhandler.getErrorMessage(err)
            context.errorMessage = detail
            this.openDialog(false, context);
          }
        }
        
      )
    )
  }

  onValidateToken(token:string){
    const context = this._errorhandler.getDialogDataWithDefaultIcon(
      'Operation succeeded', 'Operation fail', 
    '', 
    'We could not verify your token. It may be expired.'
)
    if(token){
      this.subs.add(
        this._authService.validateToken(token).subscribe({
          next: (res: any) => {
            this.tokeIsvalid = true
            //this.openDialog(true, context);
          },
          error: (err: HttpErrorResponse)=>{
            //console.log(err)
            const detail = this._errorhandler.getErrorMessage(err)
            context.errorMessage = detail
            //this.openDialog(false, context);
            this.tokeIsvalid = false
            this._router.navigate(['/auth/password-reset'])
          }
        })
      )
    }
  } 

}




