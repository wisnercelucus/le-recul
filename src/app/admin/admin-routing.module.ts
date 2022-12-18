import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Route[] = [
    {path: '', component: AdminComponent,
        children: [
            {path: '', component: DashboardComponent},
            {path: 'forms', loadChildren: () => import('../forms/forms.module').then(m => m.MyFormsModule)},
            {path: ':model', loadChildren: () => import('../data-tables/data-tables.module').then(m => m.DataTablesModule)},
        ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}