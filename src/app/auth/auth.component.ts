import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ErrorHandlerService, OpenConfirmDialog } from '../error-handler.service';
import { GeneralConfirmComponent } from '../my-dialogs/dialogs/general-confirm/general-confirm.component';
import { AuthService } from './services/auth.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy, OpenConfirmDialog {
  form!: FormGroup;
  subs = new SubSink();
  hide = true;
  isLoadingResults = false
  loginSuccss = false

  constructor(private _authService: AuthService, 
    private dialog: MatDialog,
    private _router: Router,
    private _errorhandler:ErrorHandlerService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    //this.tenant = this._utilitiesService.tenant;
    this.initiateLoginForm();
  }

  initiateLoginForm(){
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit(){
    
    this.isLoadingResults = true
    const context = this._errorhandler.getDialogDataWithDefaultIcon('', 'Login failed', '', 'You have failed to login'
      )

    this.subs.add(
      this._authService.login(this.form.value).subscribe({
        next: (res)=>{   
          this.isLoadingResults = false
          this.loginSuccss = true
          this.form.reset();   
          this._router.navigate(['/admin']);
        },
        error: (err: HttpErrorResponse)=>{
          this.isLoadingResults = false
          this.loginSuccss = false
            const detail = this._errorhandler.getErrorMessage(err)
            context.errorMessage = detail
            this.openDialog(false, context);
        },      
      }
    
      )
    )

  }

  resetPassword(){
    this._router.navigate(['/auth/password-reset'])
  }

  openDialog(success:boolean, context: any){
    this.dialog.open(GeneralConfirmComponent,
      {data: this._errorhandler.getDialogContext(success, context)});
  }

}
