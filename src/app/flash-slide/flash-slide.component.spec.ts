import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashSlideComponent } from './flash-slide.component';

describe('FlashSlideComponent', () => {
  let component: FlashSlideComponent;
  let fixture: ComponentFixture<FlashSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
