import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AccountsComponent } from "./accounts.component";

const routes: Route[] = [
    {path: ':username', component: AccountsComponent,
    children: [
        {path: '', loadChildren: ()=> import('./user-profile/user-profile.module').then(m=>m.UserProfileModule)},
        {path: 'settings', loadChildren: ()=> import('./account-settings/account-settings.module').then(m=>m.AccountSettingsModule)}
    ]
}
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AccountsRoutingModule{}