import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyToManyFormsComponent } from './many-to-many-forms.component';

describe('ManyToManyFormsComponent', () => {
  let component: ManyToManyFormsComponent;
  let fixture: ComponentFixture<ManyToManyFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManyToManyFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManyToManyFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
