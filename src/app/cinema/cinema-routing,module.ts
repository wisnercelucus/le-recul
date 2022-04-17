import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CinemaComponent } from "./cinema.component";
import { HomeComponent } from "./home/home.component";

const routes: Route[] = [
    {path: '', component: CinemaComponent,
    children: [
        {path: '', component: HomeComponent}
    ]
    },
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CinemaRoutingModule{

}