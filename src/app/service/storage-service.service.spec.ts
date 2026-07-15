import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage-service.service';

describe('StorageServiceService', () => {
  let service: StorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('referralCode', () => {
    it('should return null when no referral code has been stored', () => {
      expect(service.referralCode).toBeNull();
    });

    it('should persist a referral code to localStorage', () => {
      service.referralCode = 'RP-ABC123';
      expect(service.referralCode).toBe('RP-ABC123');
    });

    it('should not overwrite an existing referral code when setter is called with falsy value', () => {
      service.referralCode = 'ORIGINAL';
      service.referralCode = '';
      expect(service.referralCode).toBe('ORIGINAL');
    });

    it('clearReferralCode should remove the stored code', () => {
      service.referralCode = 'RP-XYZ';
      service.clearReferralCode();
      expect(service.referralCode).toBeNull();
    });
  });
});
