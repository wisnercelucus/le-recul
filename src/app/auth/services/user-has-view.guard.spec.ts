import { TestBed } from '@angular/core/testing';

import { UserHasViewGuard } from './user-has-view.guard';

describe('UserHasViewGuard', () => {
  let guard: UserHasViewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserHasViewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
