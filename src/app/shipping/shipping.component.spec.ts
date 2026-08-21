import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { ShippingComponent } from './shipping.component';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { FirebaseService } from '../service/firebase.service';
import { ShippingData } from '../model/models';

const mockActivatedRoute = {
  snapshot: { paramMap: convertToParamMap({}) }
};

const mockFirebaseService = {
  createCapture: jasmine.createSpy('createCapture')
};

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
