import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { UtilitiesService } from '../services/utilities.service';
import { isPlatformBrowser } from '@angular/common';
import { RecordImageService } from './record-image.service';
import { SubSink } from 'subsink';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteConfirmComponent } from '../my-dialogs/dialogs/delete-confirm/delete-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vn-record-image-chooser',
  templateUrl: './record-image-chooser.component.html',
  styleUrls: ['./record-image-chooser.component.scss']
})
export class RecordImageChooserComponent implements OnInit, OnDestroy {
  subs = new SubSink()
  isLoading = false

  @Output() imagesAdded: EventEmitter<any> = new EventEmitter()
  @Input() accept = '.png,.jpg,.jpeg,.gif';
  @Input() recordImages: any[] = []
  
  @Input() multiple=true
  @Input() meta_data: any = {};

  imagesBlobed: any[] = []

  public files: NgxFileDropEntry[] = []; //46 86 1413

  imageSelected: any[] = [];
  lang = '';


  constructor(
    @Inject(PLATFORM_ID) private platform_id: Object, private dialog: MatDialog, private documentsFormService: RecordImageService, private _utilitiesService: UtilitiesService) { }
  
    ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    //console.log(this.imageUrl)
    this.getRecordImages()
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.imageSelected.push(file);
          this.imagesAdded.emit(this.imageSelected);

          this.getBase64(file);

        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }

    
  }


  public fileOver(event: any){
    //console.log(event);
  }

  public fileLeave(event: any){
    //console.log(event);
  }


  folders: any[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: any[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];


  ondownloadFile(url: string){
    if(isPlatformBrowser(this.platform_id))
      window.open(url, '_blank')
  }



  getBlobsToDisplay(filename: string){
    const urls: any[] = []
    const blobs = this.imagesBlobed.filter(blob => blob.blob_name === filename)

    for(let blob of blobs){
      urls.push({name: blob.name, url: blob.dataUrl})
    }

    return urls
  }

  toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  getBase64(file: File) {
      this.toBase64(file).then(blob=> {
        this.imagesBlobed.push({name: file.name, dataUrl: blob})
      }).catch(err=> console.log(err))
  }

  

  deleteFileLocally(filename: string){
    this.imageSelected = [...this.imageSelected.filter(file => file.name !== filename)] ;
    this.imagesBlobed = [...this.imagesBlobed.filter(file => file.name !== filename)]
 
   this.imagesAdded.emit(this.imageSelected);
  }

  debugBase64(base64URL: any){
    let win = window.open();
    win!.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
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

  deleteImageOnServer(id: number){}

  onSaveImage(){
   const dataToSave = new FormData()

    for(let image of this.imageSelected){
      dataToSave.append('image', image, image.name)
    }


    for(let key of Object.keys(this.meta_data)){
      dataToSave.append(key, this.meta_data[key])
    }

    this.isLoading = true

    this.subs.add(this.documentsFormService.sendRecordDocument('images', dataToSave)
    .subscribe({
      next: (res: any)=>{
        this.isLoading = false;
        this.imageSelected = [];
        this.files = [];
        if(this.recordImages.length){
          this.recordImages = [...res['success'], ...this.recordImages]
        }else{
          this.recordImages = res['success']
        }
        this.imagesBlobed = []
        
      },
      error: (err: HttpErrorResponse)=>{
        //console.log(err)
        this.isLoading = false
      }
    }

    ))
    
  }

  getRecordImages(){
    this.subs.add(
      this.documentsFormService.getRecordImages('images', this.meta_data.app_label, this.meta_data.content_type, this.meta_data.uuid).subscribe({
        next: (res: any)=>{
          this.recordImages = res
        },
        error: (err: HttpErrorResponse)=>{
          console.log(err)
        }
      })
    )
  }

  openDialog(uuid: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {uuid: uuid, model: 'images'},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes'){
        this.documentsFormService.deleteImage('images', uuid).subscribe({
          next: (res: any) =>{
            this.recordImages = this.recordImages.filter(img => img._id !== uuid)
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        }

        );
  
      }else{
        return;
      }
    });
  }


  
}
