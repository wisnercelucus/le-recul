import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountIdenfificationsFormsComponent } from './account-idenfifications-forms.component';

describe('AccountIdenfificationsFormsComponent', () => {
  let component: AccountIdenfificationsFormsComponent;
  let fixture: ComponentFixture<AccountIdenfificationsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountIdenfificationsFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountIdenfificationsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
