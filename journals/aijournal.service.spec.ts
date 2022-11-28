import { TestBed } from '@angular/core/testing';

import { AijournalService } from './aijournal.service';

describe('AijournalService', () => {
  let service: AijournalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AijournalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
