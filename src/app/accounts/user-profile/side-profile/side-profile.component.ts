import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { mimeType } from 'src/settings/utilities/mime-type.validators';
import { SubSink } from 'subsink';
import { AccountsService, UserProfile } from '../../services/accounts.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { MyImageCroperComponent } from 'src/app/my-image-croper/my-image-croper.component';

@Component({
  selector: 'app-side-profile',
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.scss']
})
export class SideProfileComponent implements OnInit {

  @Input() profile!:UserProfile;
  imagePreview!:any;
  subs = new SubSink();
  @Input() isLoginUser!:boolean;
  @Input() hasPermission!:boolean;

  image!:FormControl;

  imageUploadForm!:FormGroup;


  constructor(private _accountsService:AccountsService, 
    private _utilitiesService: UtilitiesService,
    private dialog:MatDialog, private dialog_:MatDialog) { }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  ngOnInit(): void {

    this.imageUploadForm = new FormGroup({
      image: new FormControl(null, 
        {validators:[Validators.required],
        asyncValidators:[mimeType]
      })
    })

  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.imageUploadForm.patchValue({image:file});
    this.imageUploadForm.get('image')?.updateValueAndValidity();

    const data = {file:this.imageUploadForm.value.image, event:event}
    this.openDialog(data);  
  }

  getCompleteUrl(url: string): string{
    if(!url) return ''
  
    const urls = url.split(':')
    if(urls.includes('http') || urls.includes('https')){
      return url
    }else{
      return this._utilitiesService.base_url_no_api + url
    }
  }

  openDialog(data?:{file:any, event:any}){
    const dialogRef = this.dialog.open(MyImageCroperComponent, {
      width:'70rem',
      data: data
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(!result) return;

      this.imageUploadForm.patchValue({image:result.blob});
      this.imageUploadForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();

      reader.readAsDataURL(result.blob);
      reader.onload = () =>{
      this.imagePreview = reader.result;
      }

      const form = new FormData();        
      form.append("image", result.blob, result.name);

      this.subs.add(this._accountsService.updateProfilePicture(form, this.profile.user.username!).subscribe(res=>{
        this.hasPermission=true;
        //this.openDialog1(true);
        this.subs.add(this._accountsService.getMyProfile().subscribe())
      },
      err=>{
        this.imagePreview = "";
        //this.openDialog1(false);
        dialogRef.close();
      }
     ))

    })
  }

  /*openDialog1(success:boolean){
    this.dialog_.open(GeneralConfirmComponent,
      {data:{
        icon: success? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-triangle"></i>',
        title:success? "Operasyon an reyisi" : 'Operasyin an echwe',
        message:success? "Foto pwofil ou a chanje avek siksè.":"Nou pa arive chanje foto profil la. Tanpri reseye.",
        isSuccess:success
      }});
  }*/
  


}
