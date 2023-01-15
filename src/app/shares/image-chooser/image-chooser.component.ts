import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-image-chooser',
  templateUrl: './image-chooser.component.html',
  styleUrls: ['./image-chooser.component.scss']
})
export class ImageChooserComponent implements OnInit {
  @Output() imagesAdded: EventEmitter<any> = new EventEmitter()
  @Input() accept = '.png,.jpg,.jpeg,.gif';
  
  @Input() multiple=true
  @Input() meta_data!: {object_id: number, 
                      uuid: string, 
                      content_type: string, 
                      app_label: string};

  imagesBlobed: any[] = []

  public files: NgxFileDropEntry[] = []; //46 86 1413

  imageSelected: any[] = [];
  lang = '';


  constructor(
    @Inject(PLATFORM_ID) private platform_id: Object) { }

  ngOnInit(): void {}

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

}
