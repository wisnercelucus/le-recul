import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { blobFromUrl } from 'src/settings/utilities/blob-fromdataurl';
import { ImageCroppedEvent } from 'ngx-image-cropper';

interface DialogData{
  image:File;
  event:any;
}

@Component({
  selector: 'app-image-croper',
  templateUrl: './my-image-croper.component.html',
  styleUrls: ['./my-image-croper.component.scss']
})
export class MyImageCroperComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  event:any;
  blobToUpload:any;
  blobData!:any;

  blobFromUrl = blobFromUrl;

  constructor(@Inject(MAT_DIALOG_DATA) private data:DialogData, private dialogRef:MatDialogRef<MyImageCroperComponent>) {
    this.event = data.event;
    this.fileChangeEvent(this.event);

   }  

  ngOnInit(): void {
    
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      const b64 = this.croppedImage;
      this.blobToUpload = this.blobFromUrl(b64);
      this.blobData = {blob:this.blobToUpload, name:this.imageChangedEvent.target.files[0].name};
  }

  imageLoaded(image: HTMLImageElement) {
      // show cropper
  }

  cropperReady() {
      // cropper ready
  }

  loadImageFailed() {
      // show message
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
