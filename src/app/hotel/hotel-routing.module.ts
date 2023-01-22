import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { HotelLandingComponent } from './hotel-landing/hotel-landing.component';
import { HotelComponent } from './hotel/hotel.component';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  {
    path: '',
    component: HotelComponent,
    children: [
      { path: '', component: HotelLandingComponent },
      { path: 'rooms', component: RoomsComponent},
      { path: 'rooms/:room_uuid', loadChildren: ()=> import('./rooms/room-detail/room-detail.module').then(m=>m.RoomDetailModule)},
      { path: 'gallery', loadChildren: ()=> import('./gallery/gallery.module').then(m=>m.GalleryModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelRoutingModule {}
