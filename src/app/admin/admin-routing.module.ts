import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Route[] = [
    {path: '', component: AdminComponent,
        children: [
            {path: '', component: DashboardComponent}
        ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}