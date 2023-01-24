import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from 'src/app/error-handler.service';
import { HomeService } from 'src/app/hotel/home.service';
import { GeneralConfirmComponent } from 'src/app/my-dialogs/dialogs/general-confirm/general-confirm.component';
import { SubSink } from 'subsink';

@Component({
  selector: 'vn-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  subs = new SubSink();
  isLoading!:boolean;
  errorMessage:string='';
  successMessage = '';

  constructor(private _homeService: HomeService, private _errorHandler: ErrorHandlerService, private dialog:MatDialog) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  }

  openDialog(success:boolean, context: any){
    this.dialog.open(GeneralConfirmComponent,
      {data: this._errorHandler.getDialogContext(success, context)});
  }

  onSubmit(f:NgForm){
    //console.log(f.value)
    const context = this._errorHandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
    'Contact message sent successfully.', 
    'We faield to send your contact message. Please try again.'
    )


    const data = f.value;
    this.isLoading=true;
    this.subs.add(this._homeService.onSubscribe(data).subscribe(
      {
        next: res=>{
          this.openDialog(true, context);
          f.resetForm()
        },
        error: (err: HttpErrorResponse)=>{
          //console.log(err)
          const detail = this._errorHandler.getErrorMessage(err)
          context.errorMessage = detail
          this.openDialog(false, context);
        }
      })
    )
  }

  /*openDialog(success:boolean, errorMessage:string){
    this.dialog.open(GeneralConfirmComponent,
      {data:{
        icon: success? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-triangle"></i>',
        title:success? "Enskripsyon reyisi." : 'Operation echwe',
        message:success? "Mèsi paske w enskri pou w resevwa tout dènye mizajou yo.":errorMessage,
        isSuccess:success
      }});
  }

  cathError = (err:HttpErrorResponse) => {
    let errCase = err.error!.error!;

    if(errCase){
      switch(errCase){
        case 'Already subscribed': {
          this.errorMessage = 'Ou deja enskri.';
          break;
        }
        case 'Invalid email': {
          this.errorMessage = 'Adrès imel la pa valid.';
          break;
        }
        default:{
          this.errorMessage = 'Yon erè anpeche nou enskri w. Tanpri re-eseye';
          break;
        }
      }
    }else{
      this.errorMessage = "Yon erè nou pa idantifye fe mou pa arive enskri w. Se ka pwoblem entenèt oubyen sèvè a pa reponn."
    }  
  }*/

}
