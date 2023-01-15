import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';

import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { AccountFormsModule } from '../forms/account-forms.module';
import { AccountIdenfificationsFormsModule } from '../forms/account-idenfifications-forms/account-idenfifications-forms.module';
import { AccountPasswordFormsModule } from '../forms/account-password-forms/account-password-forms.module';

@NgModule({
  declarations: [
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule,
    MatTabsModule,
    MatIconModule,
    AccountFormsModule,
    AccountIdenfificationsFormsModule,
    AccountPasswordFormsModule
  ]
})
export class AccountSettingsModule { }
