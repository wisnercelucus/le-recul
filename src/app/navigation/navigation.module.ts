import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { UserMenuComponent } from "./user-menu/user-menu.component";
import {MatMenuModule} from '@angular/material/menu';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SpacialPackagesModule } from "../spacial-packages/spacial-packages.module";

@NgModule({
    declarations:[HeaderComponent, SidebarComponent, UserMenuComponent],
    imports: [
        CommonModule,
        MatListModule,
        MatIconModule,
        MatMenuModule,
        RouterModule,
        FontAwesomeModule,
        SpacialPackagesModule,
         MatToolbarModule,],
         exports: [HeaderComponent, SidebarComponent,]
})
export class NavigationModule{}