import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestShowsComponent } from './latest-shows.component';

describe('LatestShowsComponent', () => {
  let component: LatestShowsComponent;
  let fixture: ComponentFixture<LatestShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestShowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
