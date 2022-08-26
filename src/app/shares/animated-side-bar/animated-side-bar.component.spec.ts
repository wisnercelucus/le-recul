import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedSideBarComponent } from './animated-side-bar.component';

describe('AnimatedSideBarComponent', () => {
  let component: AnimatedSideBarComponent;
  let fixture: ComponentFixture<AnimatedSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
