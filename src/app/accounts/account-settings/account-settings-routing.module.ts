import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AccountSettingsComponent } from "./account-settings.component";


const routes: Route[] = [
    {path: '', component: AccountSettingsComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AccountSettingsRoutingModule{}