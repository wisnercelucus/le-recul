import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacialPackagesComponent } from './spacial-packages.component';

describe('SpacialPackagesComponent', () => {
  let component: SpacialPackagesComponent;
  let fixture: ComponentFixture<SpacialPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacialPackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacialPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
