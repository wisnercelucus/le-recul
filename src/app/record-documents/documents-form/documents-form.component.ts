import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { DeleteConfirmComponent } from 'src/app/my-dialogs/dialogs/delete-confirm/delete-confirm.component';
import { SubSink } from 'subsink';
import { DocumentsFormService } from '../documents-form.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-documents-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.scss']
})
export class DocumentsFormComponent implements OnInit {
  @Input() meta_data!: {object_id: number, uuid: string, content_type: string, app_label: string};

  documentsGroups: any[] = []
  imagesBlobed: any[] = []

  @Input() hasPermissionViewDocuments = false
  @Input() hasPermissionAddDocuments = false
  @Input() hasPermissionDeleteDocuments = false


  public files: NgxFileDropEntry[] = []; //46 86 1413
  errorMessage!:string;
  documentSelected: any[] = [];
  isLoading = false;
  cardError!:string;
  bannerText =
  {'p': "Report a bug. Help us improve!",
  'btn': 'Get involved'
  }
  lang = '';

  subs = new SubSink();

  constructor(private documentsFormService:DocumentsFormService,
    @Inject(PLATFORM_ID) private platform_id: Object,
    private _utilitiesService: UtilitiesService,
    private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    //console.log(this.meta_data)

    this.onGetObjectDocuments()
  }

  onHandleError(){
    this.errorMessage ="";
  }

  onSubmit(f:NgForm){
    const data = f.value;
    
    let formData = new FormData();
    formData.append('name', data['name']);
    formData.append('object_id', data['object_id']);
    formData.append('content_type', data['content_type']);
    formData.append('app_label', data['app_label']);


    if (this.documentSelected) {
      for (let doc of this.documentSelected) {
        formData.append('document', doc, doc.name);
      }
    }


    this.isLoading = true;

    this.subs.add(this.documentsFormService.sendRecordDocument('documents', formData)
    .subscribe(
      (res: any)=>{
        this.isLoading = false;
        this.errorMessage ="Document sent."
        this.documentSelected = [];
        this.files = [];
        const group = res.group
        let index = this.documentsGroups.findIndex(g => g._id === group._id)

        if(index !== -1){
          this.documentsGroups[index] = group
        }else{
          this.documentsGroups.push(group)
        }
        //f.resetForm()
        f.setValue({name: "", 
                    content_type: this.meta_data.content_type, 
                    app_label: this.meta_data.app_label,
                    object_id: this.meta_data.object_id
                  })
      }, (err: HttpErrorResponse)=>{
      this.isLoading = false
    }
    ))

  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    //console.log(this.files)
    //this.documentSelected = this.files;
    for (const droppedFile of files) {
      //console.log(droppedFile)

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.documentSelected.push(file);
          this.getBase64(file);

          // Here you can access the real file
          //console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
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

  onGetObjectDocuments(){
    this.subs.add(
      this.documentsFormService.getModelDocuments(
        'documents',
        this.meta_data.app_label,
        this.meta_data.content_type,
        this.meta_data.uuid
      ).subscribe(res=>{
        this.documentsGroups = res;
      })
    )
  }


  openDialog(group_uuid: string, uuid: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {uuid: uuid, model: 'documents'},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes'){
        this.documentsFormService.deleteDocument('documents', uuid).subscribe(
          (res: any) =>{
            let group = null;
            const index = this.documentsGroups.findIndex(g => g._id === group_uuid)

            if(index !== -1){
              group = this.documentsGroups[index];
            }

            if(!res['empty_group'] && group){
              let documents = group.documents.filter((doc:any) => doc._id !== uuid)
              group.documents = [...documents]
            }else if(res['empty_group'] && group){
              this.documentsGroups = [...this.documentsGroups.filter(dG => dG._id   !== group_uuid)]
            }
            
            /*if(index !== -1){
              const group = this.documentsGroups[index];
              let documents = group.documents.filter((doc:any) => doc._id !== uuid)
              group.documents = [...documents]
            }*/

          }
        );
  
      }else{
        return;
      }
    });
  }

  ondownloadFile(url: string){
    if(isPlatformBrowser(this.platform_id))
      window.open(url, '_blank')
  }


  getCompleteUrl(url: string): string{
    if(!url) return ''
  
    const urls = url.split(':')
    if(urls.includes('http') || urls.includes('https')){
      return url
    }else{
      return this._utilitiesService.base_url_no_trail + url
    }
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
    this.documentSelected = [...this.documentSelected.filter(file => file.name !== filename)] ;
    this.imagesBlobed = [...this.imagesBlobed.filter(file => file.name !== filename)]
  }

  debugBase64(base64URL: any){
    let win = window.open();
    win!.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }

}
