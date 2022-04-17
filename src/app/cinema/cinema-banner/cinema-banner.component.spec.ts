import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaBannerComponent } from './cinema-banner.component';

describe('CinemaBannerComponent', () => {
  let component: CinemaBannerComponent;
  let fixture: ComponentFixture<CinemaBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
