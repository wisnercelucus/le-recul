import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { RecordDetailsComponent } from "./record-details.component";

const routes: Route[] = [
    {path: '', component: RecordDetailsComponent}
]


@NgModule({
    imports:[RouterModule.forChild(routes)]
})
export class RecordDetailsRoutingModule{}