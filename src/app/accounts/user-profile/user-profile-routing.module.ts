import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { UserProfileComponent } from "./user-profile.component";

const routes: Route[] = [
    {path: '', component: UserProfileComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class UserProfileRoutingModule{}