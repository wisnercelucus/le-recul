import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-documents',
  templateUrl: './record-documents.component.html',
  styleUrls: ['./record-documents.component.scss']
})
export class RecordDocumentsComponent implements OnInit {
  @Input() meta_data!: {object_id: number, uuid: string, content_type: string, app_label:string};

  @Input() hasPermissionViewDocuments = false
  @Input() hasPermissionAddDocuments = false
  @Input() hasPermissionDeleteDocuments = false

  constructor() { }

  ngOnInit(): void {
    //console.log(this.meta_data)
  }

}
