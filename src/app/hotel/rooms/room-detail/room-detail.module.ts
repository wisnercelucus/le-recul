import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailComponent } from './room-detail.component';
import { RoomDetailRoutingModule } from './room-detail-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SafeHtmlPipe } from '../rooms.component';
import { SharedGlobalModule } from 'src/app/shares/shared-global/shared-global.module';

@NgModule({
  declarations: [
    RoomDetailComponent
  ],
  imports: [
    CommonModule,
    RoomDetailRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    NgxMaterialRatingModule,
    MatDividerModule,
    MatIconModule,
    SharedGlobalModule
  ]
})
export class RoomDetailModule { }
