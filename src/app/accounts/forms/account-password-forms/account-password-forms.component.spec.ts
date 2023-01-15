import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPasswordFormsComponent } from './account-password-forms.component';

describe('AccountPasswordFormsComponent', () => {
  let component: AccountPasswordFormsComponent;
  let fixture: ComponentFixture<AccountPasswordFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPasswordFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPasswordFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
