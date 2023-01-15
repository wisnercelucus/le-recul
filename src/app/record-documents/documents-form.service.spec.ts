import { TestBed } from '@angular/core/testing';

import { DocumentsFormService } from './documents-form.service';

describe('DocumentsFormService', () => {
  let service: DocumentsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
