import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(/*private welcomeService:WelcomeService, private dialog:MatDialog*/) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    console.log(f.value)
   /* const data = f.value;
    this.isLoading=true;
    this.subs.add(this.welcomeService.onSubscribe(data).subscribe(res=>{
      this.isLoading=false;
      this.openDialog(true, "");
    },
    (err:HttpErrorResponse)=>{
      this.isLoading=false;
      this.cathError(err);
      this.openDialog(false, this.errorMessage);
    }))*/
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
