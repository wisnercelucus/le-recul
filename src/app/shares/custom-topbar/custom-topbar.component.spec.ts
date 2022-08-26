import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTopbarComponent } from './custom-topbar.component';

describe('CustomTopbarComponent', () => {
  let component: CustomTopbarComponent;
  let fixture: ComponentFixture<CustomTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
