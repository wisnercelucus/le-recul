import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReusableComponentsModule } from "src/app/reusable-components/reusable-components.module";
import { GalleryRoutingModule } from "./gallery-routing.module";
import { GalleryComponent } from "./gallery.component";

@NgModule({
    declarations: [GalleryComponent],
    imports: [CommonModule, 
        GalleryRoutingModule,
        ReusableComponentsModule,
    ]
})
export class GalleryModule{}