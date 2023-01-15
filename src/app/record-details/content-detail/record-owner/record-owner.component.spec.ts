import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordOwnerComponent } from './record-owner.component';

describe('RecordOwnerComponent', () => {
  let component: RecordOwnerComponent;
  let fixture: ComponentFixture<RecordOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
