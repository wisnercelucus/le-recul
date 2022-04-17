import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardLoaderComponent } from './profile-card-loader.component';

describe('ProfileCardLoaderComponent', () => {
  let component: ProfileCardLoaderComponent;
  let fixture: ComponentFixture<ProfileCardLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCardLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
