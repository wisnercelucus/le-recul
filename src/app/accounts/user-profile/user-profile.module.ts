import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SideProfileComponent } from './side-profile/side-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    UserProfileComponent,
    SideProfileComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatDividerModule
  ]
})
export class UserProfileModule { }
