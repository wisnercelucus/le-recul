import { NgModule } from "@angular/core";
import { BookRoomComponent } from "./book-room.component";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [BookRoomComponent],
    imports: [CommonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    exports: [BookRoomComponent]
})
export class BookRoomModule{}