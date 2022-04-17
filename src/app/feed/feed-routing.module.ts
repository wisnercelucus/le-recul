import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { FeedComponent } from "./feed.component";

const routes: Route[] = [
    {path: '', component: FeedComponent}
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class FeedRoutingModule{}