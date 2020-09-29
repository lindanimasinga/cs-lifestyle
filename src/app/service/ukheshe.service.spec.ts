import { TestBed } from '@angular/core/testing';

import { UkhesheService } from './ukheshe.service';

describe('UkhesheService', () => {
  let service: UkhesheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UkhesheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
