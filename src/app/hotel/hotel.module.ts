import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelLandingComponent } from './hotel-landing/hotel-landing.component';
import { HotelBannerComponent } from './hotel-landing/hotel-banner/hotel-banner.component';
import { SkeletonLoaderModule } from '../shares/skeleton-loader/skeleton-loader.module';
import { HotelComponent } from './hotel/hotel.component';
import { GalleryPreviewComponent } from './hotel-landing/gallery-preview/gallery-preview.component';
import { BookRoomComponent } from './hotel-landing/book-room/book-room.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookFormComponent } from './forms/book-form/book-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { RoomsComponent } from './rooms/rooms.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ServicesComponent } from './services/services.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatIconModule } from '@angular/material/icon';
import { FlashSlideModule } from '../flash-slide/flash-slide.module';
import { SharedGlobalModule } from '../shares/shared-global/shared-global.module';



@NgModule({
  declarations: [
    HotelLandingComponent,
    HotelBannerComponent,
    HotelComponent,
    GalleryPreviewComponent,
    BookRoomComponent,
    BookFormComponent,
    RoomsComponent,
    RestaurantComponent,
    ServicesComponent,
  ],
  imports: [
    CommonModule,
    ReusableComponentsModule,
    HotelRoutingModule,
    SkeletonLoaderModule,
    FontAwesomeModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CarouselModule,
    MatIconModule,
    SharedGlobalModule,
    FlashSlideModule
  ],
})
export class HotelModule {}
