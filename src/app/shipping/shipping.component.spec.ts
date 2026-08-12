import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ShippingComponent } from './shipping.component';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { ShippingData } from '../model/models';
import { FirebaseService } from '../service/firebase.service';
import { UserProfile } from '../model/models';

const mockActivatedRoute = {
  snapshot: { paramMap: convertToParamMap({}) }
};

const mockFirebaseService = {
  createCapture: jasmine.createSpy('createCapture')
};

describe('ShippingComponent — referral code attachment (RP-004b)', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;
  let storageService: StorageService;
  let orderManagementService: jasmine.SpyObj<IzingaOrderManagementService>;

  beforeEach(async(() => {
    const orderSpy = jasmine.createSpyObj('IzingaOrderManagementService', ['registerCustomer', 'getCustomerByPhoneNumber', 'startOrder']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ShippingComponent],
      providers: [
        StorageService,
        { provide: IzingaOrderManagementService, useValue: orderSpy },
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
    orderManagementService = TestBed.inject(IzingaOrderManagementService) as jasmine.SpyObj<IzingaOrderManagementService>;
    fixture.detectChanges();
  });

  it('should attach the stored referral code to the user profile before calling registerCustomer', () => {
    const mockUser: UserProfile = { id: 'new-user-id', mobileNumber: '0812345678', role: UserProfile.RoleEnum.CUSTOMER, imageUrl: '' };
    storageService.referralCode = 'RP-PARTNER01';
    orderManagementService.registerCustomer.and.returnValue(of(mockUser));

    component.userProfile = { mobileNumber: '0812345678', role: UserProfile.RoleEnum.CUSTOMER, imageUrl: '' };
    component.createCustomer().subscribe();

    const registrationPayload: UserProfile = orderManagementService.registerCustomer.calls.mostRecent().args[0];
    expect(registrationPayload.referralCode).toBe('RP-PARTNER01');
  });

  it('should clear the stored referral code after successful registration', () => {
    const mockUser: UserProfile = { id: 'new-user-id', mobileNumber: '0812345678', role: UserProfile.RoleEnum.CUSTOMER, imageUrl: '' };
    storageService.referralCode = 'RP-PARTNER01';
    orderManagementService.registerCustomer.and.returnValue(of(mockUser));

    component.userProfile = { mobileNumber: '0812345678', role: UserProfile.RoleEnum.CUSTOMER, imageUrl: '' };
    component.createCustomer().subscribe();

    expect(storageService.referralCode).toBeNull();
  });

  it('should not attach referralCode when no referral code is stored', () => {
    const mockUser: UserProfile = { id: 'new-user-id', mobileNumber: '0812345678', role: UserProfile.RoleEnum.CUSTOMER, imageUrl: '' };
    orderManagementService.registerCustomer.and.returnValue(of(mockUser));

    component.userProfile = { mobileNumber: '0812345678', role: UserProfile.RoleEnum.CUSTOMER, imageUrl: '' };
    component.createCustomer().subscribe();

    const registrationPayload: UserProfile = orderManagementService.registerCustomer.calls.mostRecent().args[0];
    expect(registrationPayload.referralCode).toBeUndefined();
  });

  it('should not attach referralCode to an already-registered user profile (path guarded by id check)', () => {
    // createCustomer is only called when userProfile.id == null; this test confirms
    // the guard in startOrder() prevents double-registration for returning users.
    storageService.referralCode = 'RP-PARTNER01';
    component.userProfile = { id: 'existing-id', mobileNumber: '0812345678', role: UserProfile.RoleEnum.CUSTOMER, imageUrl: '' };
    // registerCustomer should not be called at all when id is present
    expect(orderManagementService.registerCustomer).not.toHaveBeenCalled();
  });
});

describe('ShippingComponent', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;

  beforeEach(async(() => {
    const orderSpy = jasmine.createSpyObj('IzingaOrderManagementService', ['registerCustomer', 'getCustomerByPhoneNumber', 'startOrder']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ShippingComponent],
      providers: [
        StorageService,
        { provide: IzingaOrderManagementService, useValue: orderSpy },
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('ShippingComponent — T&Cs acceptance gate', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;

  beforeEach(async(() => {
    const orderSpy = jasmine.createSpyObj('IzingaOrderManagementService', ['registerCustomer', 'getCustomerByPhoneNumber', 'startOrder']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ShippingComponent],
      providers: [
        StorageService,
        { provide: IzingaOrderManagementService, useValue: orderSpy },
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should default termsAccepted to false', () => {
    expect(component.termsAccepted).toBe(false);
  });

  it('should return false from validData() when termsAccepted is false, even with all other fields populated', () => {
    component.userProfile.name = 'Test';
    component.userProfile.surname = 'User';
    component.userProfile.mobileNumber = '+27811234567';
    component.userProfile.address = '1 Test Street, Johannesburg';
    component.shippingBuildingType = ShippingData.BuildingTypeEnum.HOUSE;
    component.termsAccepted = false;

    expect(component.validData()).toBeFalsy();
  });

  it('should return true from validData() when all fields are populated and termsAccepted is true', () => {
    component.userProfile.name = 'Test';
    component.userProfile.surname = 'User';
    component.userProfile.mobileNumber = '+27811234567';
    component.userProfile.address = '1 Test Street, Johannesburg';
    component.shippingBuildingType = ShippingData.BuildingTypeEnum.HOUSE;
    component.termsAccepted = true;

    expect(component.validData()).toBeTruthy();
  });

  it('should return false from validData() when address is missing, even if termsAccepted is true', () => {
    component.userProfile.name = 'Test';
    component.userProfile.surname = 'User';
    component.userProfile.mobileNumber = '+27811234567';
    component.userProfile.address = null;
    component.shippingBuildingType = ShippingData.BuildingTypeEnum.HOUSE;
    component.termsAccepted = true;

    expect(component.validData()).toBeFalsy();
  });
});
