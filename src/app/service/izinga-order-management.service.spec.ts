import { TestBed } from '@angular/core/testing';

import { IzingaOrderManagementService } from './izinga-order-management.service';

describe('IzingaOrderManagementService', () => {
  let service: IzingaOrderManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IzingaOrderManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
