import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { UserProfile, Order, ShippingData } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { from, Observable, of, throwError } from 'rxjs';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  //@ViewChild("placesRef") placesRef : GooglePlaceDirective;
  
  isVerificationRequested = false
  code: string
  shippingBuildingType: ShippingData.BuildingTypeEnum
  buildingTypeEnums = ShippingData.BuildingTypeEnum
  shippingBuildingUnitNumber: string
  shippingBuildingName: string
  additionalInstructions: string
  _newAddressLatitude: number
  _newAddressLongitude: number

  fromAddress: string
  fromBuildingType: ShippingData.BuildingTypeEnum
  fromUnitNumber: string
  fromBuildingName: string
  fromLatitude: string
  fromLongitude: string

  deliverySchedule = ShippingData.TypeEnum.DELIVERY
  LATER = ShippingData.TypeEnum.SCHEDULED_DELIVERY
  NOW = ShippingData.TypeEnum.DELIVERY

  userProfile: UserProfile = {
    imageUrl: "https://pbs.twimg.com/media/C1OKE9QXgAAArDp.jpg",
    role: UserProfile.RoleEnum.CUSTOMER
  }
  order: Order;
  userAlreadyRegistered: boolean;
  hasError: boolean;
  errorMessage: string;
  messegers: UserProfile[];
  selectedDate?: string
  selectedTime?: string
  pickUpDate?: Date

  constructor(private izingaOrderManager: IzingaOrderManagementService,
    private storageService: StorageService,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.storageService.userProfile && this.isPhoneNumberVerified) {
      this.userProfile = this.storageService.userProfile
      this.isVerificationRequested = true
      setTimeout(() => this.loadNearbyMessengers(), 5000)
    } else {
      this.userProfile.mobileNumber = this.storageService.phoneNumber
    }
  }

  get isPhoneNumberVerified(): boolean {
    return this.storageService.phoneVerified
  }

  get phoneNumber() {
    return this.storageService.phoneNumber
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

    this.pickUpDate = this.deliverySchedule == this.LATER ? this.updateDateTime() : null

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
            fromAddress: this.fromAddress ? this.fromAddress : `${this.storageService.shop?.name}`,
            toAddress: this.userProfile.address,
            messengerId: environment.messengerId,
            fromBuildingType: this.fromBuildingType,
            fromBuildingName: this.fromBuildingName,
            fromUnitNumber: this.fromUnitNumber,
            buildingType: this.shippingBuildingType,
            unitNumber: this.shippingBuildingUnitNumber,
            buildingName: this.shippingBuildingName,
            type: this.deliverySchedule,
            additionalInstructions: this.additionalInstructions,
            pickUpTime: this.pickUpDate
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

    if (this.storageService.shop?.storeMessenger && this.storageService.shop?.storeMessenger?.length > 0) {
      console.log("looking up store messangers")
      var lat = this.storageService.currentLocation.lat
      var long = this.storageService.currentLocation.long
      this.izingaOrderManager.findNearbyMessangers(lat, long, environment.range)
      .subscribe(mess => {
        this.messegers = mess
      })
      return
    }

    var latitude = this._newAddressLatitude != null && this._newAddressLatitude != 0 ? this._newAddressLatitude 
      : this.userProfile.latitude != null && this.userProfile.latitude != 0 ? this.userProfile.latitude: this.storageService.currentLocation.lat;
    
    var longitude = this._newAddressLongitude != null && this._newAddressLongitude != 0 ? this._newAddressLongitude
      : this.userProfile.longitude != null && this.userProfile.longitude != 0 ? this.userProfile.longitude: this.storageService.currentLocation.long;

    console.log(`latitude/longitude is ${latitude}/${longitude}`)// 0.09999 is 15km range
    console.log("looking nearby messangers")
    this.izingaOrderManager.findNearbyMessangers(latitude, longitude, environment.range)
    .subscribe(mess => {
      this.messegers = mess
    })
  }

  updateDateTime(): Date| null {
    if (this.selectedDate && this.selectedTime) {
      const dateTimeString = `${this.selectedDate}T${this.selectedTime}:00.000+00:00`; // ISO format string
      const timestamp = Date.parse(dateTimeString);
      return this.pickUpDate = new Date(timestamp);
    }
    return null
  }

  get deliversFromMultipleAddresses() {
    return this.storageService.shop?.deliversFromMultipleAddresses || this.storageService.shop?.deliversFromMultipleAddresses == true
  }

}

