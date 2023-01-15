import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyToManyDataComponent } from './many-to-many-data.component';

describe('ManyToManyDataComponent', () => {
  let component: ManyToManyDataComponent;
  let fixture: ComponentFixture<ManyToManyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManyToManyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManyToManyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
