import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { DataTablesComponent } from "./data-tables.component";

const routes: Route[] = [{path: "", component: DataTablesComponent}]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class DataTablesRotingModule{}