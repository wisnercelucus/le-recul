import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSideNavComponent } from './dynamic-side-nav.component';

describe('DynamicSideNavComponent', () => {
  let component: DynamicSideNavComponent;
  let fixture: ComponentFixture<DynamicSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicSideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
