import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { PasswordResetConfirmComponent } from "./password-reset-confirm/password-reset-confirm.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";

const routes: Routes = [
    {path: '', component: AuthComponent},
    {path: 'password-reset', component: PasswordResetComponent},
    {path: 'password-reset/:token', component: PasswordResetConfirmComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule{}