import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableHeaderComponent } from './data-table-header.component';

describe('DataTableHeaderComponent', () => {
  let component: DataTableHeaderComponent;
  let fixture: ComponentFixture<DataTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
