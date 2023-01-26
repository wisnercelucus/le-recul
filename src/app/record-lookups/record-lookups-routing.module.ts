import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { RecordLookupsComponent } from "./record-lookups.component";


const routes: Route[] = [
    {path: '', component: RecordLookupsComponent}
]


@NgModule({
    imports:[RouterModule.forChild(routes)]
})
export class RecordLookupsRoutingModule{}