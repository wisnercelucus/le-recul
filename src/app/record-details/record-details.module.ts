import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordDetailsComponent } from './record-details.component';
import { RecordDetailsRoutingModule } from './record-details.routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ContentDetailComponent } from './content-detail/content-detail.component';
import { DetailActionsComponent } from './content-detail/detail-actions/detail-actions.component';
import { RecordOwnerComponent } from './content-detail/record-owner/record-owner.component';
import { FlexDetailComponent } from './content-detail/flex-detail/flex-detail.component';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MyDialogsModule } from '../my-dialogs/my-dialogs.module';
import { ManyToManyFormsComponent } from './many-to-many-forms/many-to-many-forms.component';
import { ManyToManyDataComponent } from './many-to-many-data/many-to-many-data.component';
import { RecordDocumentFormComponent } from './record-document-form/record-document-form.component';
import { RecordDocumentsModule } from '../record-documents/record-documents.module';

import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataTablesModule } from '../data-tables/data-tables.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

import { ApprovalsModule } from '../approvals/approvals.module';
import { TasksModule } from '../tasks/tasks.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

import { MatInputModule } from '@angular/material/input';

import { QuillModule } from 'ngx-quill';
import { RelatedRecordFormsModule } from '../forms/related-record-forms/related-record-forms.module';
import { RecordImageChooserModule } from '../record-image-chooser/record-image-chooser.module';

//import { FormSettingsModule } from '../forms/form-settings/form-settings.module';

@NgModule({
  declarations: [
    RecordDetailsComponent,
    ContentDetailComponent,
    DetailActionsComponent,
    RecordOwnerComponent,
    FlexDetailComponent,
    ManyToManyFormsComponent,
    ManyToManyDataComponent,
    RecordDocumentFormComponent,

  ],
  imports: [
    CommonModule,
    RecordDetailsRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MyDialogsModule,
    RecordDocumentsModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    DataTablesModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ApprovalsModule,
    TasksModule,
    MatExpansionModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    QuillModule,
    RelatedRecordFormsModule,
    RecordImageChooserModule
  ],
  exports: [  RecordDetailsComponent,
    ContentDetailComponent,
    DetailActionsComponent,
    RecordOwnerComponent,
    FlexDetailComponent,
    ManyToManyFormsComponent,
    ManyToManyDataComponent,
    RecordDocumentFormComponent,

  ]
})
export class RecordDetailsModule { }
