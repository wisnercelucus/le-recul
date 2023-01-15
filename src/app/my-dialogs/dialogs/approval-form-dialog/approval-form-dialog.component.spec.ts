import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFormDialogComponent } from './approval-form-dialog.component';

describe('ApprovalFormDialogComponent', () => {
  let component: ApprovalFormDialogComponent;
  let fixture: ComponentFixture<ApprovalFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
