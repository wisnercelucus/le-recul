import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorHandlerService, OpenConfirmDialog } from 'src/app/error-handler.service';
import { GeneralConfirmComponent } from 'src/app/my-dialogs/dialogs/general-confirm/general-confirm.component';
import { SubSink } from 'subsink';
import { AuthService } from '../services/auth.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OpenConfirmDialog {

  form!: FormGroup;
  tenant!: string;
  subs = new SubSink();

  constructor(private _authService: AuthService, 
    private _router: Router,
    private _dialog:MatDialog,
    private _errorHandler: ErrorHandlerService,
    private _utilitiesService:UtilitiesService) { }

  openDialog(success: boolean, context: any): void {
    this._dialog.open(GeneralConfirmComponent,
      {data: this._errorHandler.getDialogContext(success, context)}
      )
  }
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
    });
  }

  onSubmit(){
    const context = this._errorHandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
    'We sent you an email with the link to reset your password.', 
    'We were not able to verify your email address.'
)
    this._authService.passwordResetRequest(this.form.value).subscribe(
      {next: (res)=>{
        this._router.navigate(['/home'])
        this.openDialog(true, context);
      },
      error: (err: HttpErrorResponse)=>{
        const detail = this._errorHandler.getErrorMessage(err)
        context.errorMessage = detail
        this.openDialog(false, context);
      }
    }
    )
  }


}
