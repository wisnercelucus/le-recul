import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailActionsComponent } from './detail-actions.component';

describe('DetailActionsComponent', () => {
  let component: DetailActionsComponent;
  let fixture: ComponentFixture<DetailActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
