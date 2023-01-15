import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CascadeFormComponent } from './cascade-form.component';

describe('CascadeFormComponent', () => {
  let component: CascadeFormComponent;
  let fixture: ComponentFixture<CascadeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CascadeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CascadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
