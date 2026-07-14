import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { MainComponent } from './main.component';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';

function buildTestBed(queryParams: { [key: string]: string }) {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [MainComponent],
    providers: [
      StorageService,
      {
        provide: IzingaOrderManagementService,
        useValue: { getStoreById: () => of({}) }
      },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: convertToParamMap({}),
            queryParamMap: convertToParamMap(queryParams)
          }
        }
      }
    ]
  });
}

describe('MainComponent — referral code capture (RP-004b)', () => {
  let storageService: StorageService;

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should store the ref query param when present and no existing code is stored', async(() => {
    buildTestBed({ ref: 'RP-PARTNER01' });
    TestBed.compileComponents().then(() => {
      const fixture: ComponentFixture<MainComponent> = TestBed.createComponent(MainComponent);
      storageService = TestBed.inject(StorageService);
      fixture.detectChanges();
      expect(storageService.referralCode).toBe('RP-PARTNER01');
    });
  }));

  it('should not overwrite an existing referral code on subsequent page loads', async(() => {
    buildTestBed({ ref: 'SECOND-CODE' });
    TestBed.compileComponents().then(() => {
      localStorage.setItem('rp_ref_code', 'FIRST-CODE');
      const fixture: ComponentFixture<MainComponent> = TestBed.createComponent(MainComponent);
      storageService = TestBed.inject(StorageService);
      fixture.detectChanges();
      expect(storageService.referralCode).toBe('FIRST-CODE');
    });
  }));

  it('should not set a referral code when ref query param is absent', async(() => {
    buildTestBed({});
    TestBed.compileComponents().then(() => {
      const fixture: ComponentFixture<MainComponent> = TestBed.createComponent(MainComponent);
      storageService = TestBed.inject(StorageService);
      fixture.detectChanges();
      expect(storageService.referralCode).toBeNull();
    });
  }));
});

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    buildTestBed({});
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
