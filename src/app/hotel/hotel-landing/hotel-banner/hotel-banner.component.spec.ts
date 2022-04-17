import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBannerComponent } from './hotel-banner.component';

describe('HotelBannerComponent', () => {
  let component: HotelBannerComponent;
  let fixture: ComponentFixture<HotelBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
