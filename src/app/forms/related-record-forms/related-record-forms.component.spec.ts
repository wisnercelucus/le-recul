import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedRecordFormsComponent } from './related-record-forms.component';

describe('RelatedRecordFormsComponent', () => {
  let component: RelatedRecordFormsComponent;
  let fixture: ComponentFixture<RelatedRecordFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedRecordFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedRecordFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
