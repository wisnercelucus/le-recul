import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RoomDetailComponent } from "./room-detail.component";

const routes: Route[] = [{
    path: 'details', component: RoomDetailComponent
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
    })
export class RoomDetailRoutingModule{}