import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfile, Order, ShippingData } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { map, mergeMap, catchError } from 'rxjs/operators';
import { from, Observable, of, throwError } from 'rxjs';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  //@ViewChild("placesRef") placesRef : GooglePlaceDirective;
  
  isPhoneNumberVerified = false
  isVerificationRequested = false
  code: string
  shippingBuildingType: ShippingData.BuildingTypeEnum
  buildingTypeEnums = ShippingData.BuildingTypeEnum
  shippingBuildingUnitNumber: string
  shippingBuildingName: string
  additionalInstructions: string
  _newAddressLatitude: number
  _newAddressLongitude: number

  userProfile: UserProfile = {
    imageUrl: "https://pbs.twimg.com/media/C1OKE9QXgAAArDp.jpg",
    role: UserProfile.RoleEnum.CUSTOMER
  }
  order: Order;
  userAlreadyRegistered: boolean;
  hasError: boolean;
  errorMessage: string;
  messegers: UserProfile[];

  constructor(private izingaOrderManager: IzingaOrderManagementService,
    private storageService: StorageService,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log("Capture created")
    this.firebaseService.createCapture();
  }

  resend() {
    this.isVerificationRequested = false
  }

  get phoneNumber(): string {
    return this.userProfile.mobileNumber
  }

  set phoneNumber(phoneNumber: string) {
    this.userProfile.mobileNumber =  phoneNumber
  }

  set newAddressLatitude(latitude: number) {
    this._newAddressLatitude = latitude;
    this.loadNearbyMessengers()
  }

  get newAddressLatitude() {
    return this._newAddressLatitude;
  } 

  set newAddressLongitude(longitude: number) {
    this._newAddressLongitude = longitude;
    this.loadNearbyMessengers()
  }

  get newAddressLongitude() {
    return this._newAddressLongitude;
  } 

  validData() {
    return this.userProfile.address && this.userProfile.name
      && this.userProfile.mobileNumber 
      && (this.shippingBuildingType == ShippingData.BuildingTypeEnum.HOUSE || (this.shippingBuildingUnitNumber && this.shippingBuildingName))
  }

  verify() {
    this.phoneNumber = this.phoneNumber.startsWith("+27")? this.phoneNumber : this.phoneNumber.startsWith("0") ? 
      this.phoneNumber.replace("0", "+27") : this.phoneNumber.startsWith("27") ? "+" + this.phoneNumber : "+27" +this.phoneNumber;
    this.firebaseService.requestVerification(this.phoneNumber)
      .subscribe(() => {
        this.isVerificationRequested = true
        this.hasError = false;
      }, (error) => {
        this.hasError = true;
        this.errorMessage = error.message;
      })
  }

  confirmCode() {
    this.firebaseService.confirmCode(this.code)
      .subscribe(cred => {
        this.isPhoneNumberVerified = true
        this.findCustomer()
        document.getElementsByName("scrollTo")[0].scrollIntoView();
        window.scrollBy(0, -76)
      }, (error) => {
        console.log(error)
      })
  }

  findCustomer() {
    this.izingaOrderManager.getCustomerByPhoneNumber(this.userProfile.mobileNumber)
    .pipe(
      catchError(error => {
        if(error.status === 404) {
          console.log("Not found user")
          return of(this.userProfile)
        } else {
          return throwError(error); 
        }
      }),
    )
    .subscribe(user => {
      this.userProfile = user
      this.storageService.userProfile = user;
      this.loadNearbyMessengers()
    })
  }

  createCustomer(): Observable<UserProfile> {
    return this.izingaOrderManager.registerCustomer(this.userProfile)
    .pipe(map(user => {
      this.userProfile = user
      this.storageService.userProfile = user;
      return user;
    }))
  }

  startOrder() {

    if(!this.validData()) {
      return
    }

    if(this.messegers == null || this.messegers.length == 0) {
      this.storageService.errorMessage = "Messengers not available in your area at the moment."
      return
    }

    console.log(`enum is ${JSON.stringify(this.shippingBuildingType)}`)
    var customerObsv = this.userProfile.id != null ? of(this.userProfile) : this.createCustomer()
    customerObsv.pipe(
      mergeMap(() => {
        this.order = {
          basket : this.storageService.basket,
          customerId: this.userProfile.id,
          shopId: this.storageService.shop.id,
          orderType: Order.OrderTypeEnum.ONLINE,
          stage: Order.StageEnum._0CUSTOMERNOTPAID,
          description: `ord-${this.userProfile.mobileNumber}`,
          shippingData: {
            fromAddress: `${this.storageService.shop?.name}`,
            toAddress: this.userProfile.address,
            messengerId: environment.messengerId,
            buildingType: this.shippingBuildingType,
            unitNumber: this.shippingBuildingUnitNumber,
            buildingName: this.shippingBuildingName,
            type: ShippingData.TypeEnum.DELIVERY,
            additionalInstructions: this.additionalInstructions
          }
        }
        return this.izingaOrderManager.startOrder(this.order)
      }))
    .subscribe(order => {
      this.order = order
      this.order.description =  `ord-${this.order.id}`,
      this.storageService.order = order
      window.location.href = `${environment.izingaPayUrl}?Status=init&type=yoco&TransactionReference=${order.id}&callback=${environment.ozow_succeess_url}`
    })
  }

  loadNearbyMessengers() {
    var latitude = this._newAddressLatitude != null && this._newAddressLatitude != 0 ? this._newAddressLatitude 
      : this.userProfile.latitude != null && this.userProfile.latitude != 0 ? this.userProfile.latitude: this.storageService.currentLocation.lat;
    
    var longitude = this._newAddressLongitude != null && this._newAddressLongitude != 0 ? this._newAddressLongitude
      : this.userProfile.longitude != null && this.userProfile.longitude != 0 ? this.userProfile.longitude: this.storageService.currentLocation.long;

    console.log(`latitude/longitude is ${latitude}/${longitude}`)// 0.09999 is 15km range
    this.izingaOrderManager.findNearbyMessangers(latitude, longitude, 0.09999).subscribe(mess => {
      this.messegers = mess
    })
  }

}
