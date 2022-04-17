import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesesComponent } from './busineses.component';

describe('BusinesesComponent', () => {
  let component: BusinesesComponent;
  let fixture: ComponentFixture<BusinesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
