import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { FormsComponent } from "./forms.component";

const routes: Route[] = [{path: "", component: FormsComponent}]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class FormsRouting{}