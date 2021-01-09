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

  userProfile: UserProfile = {
    imageUrl: "https://pbs.twimg.com/media/C1OKE9QXgAAArDp.jpg",
    role: UserProfile.RoleEnum.CUSTOMER
  }
  order: Order;
  userAlreadyRegistered: boolean;
  hasError: boolean;
  errorMessage: string;

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

  validData() {
    return this.userProfile.address && this.userProfile.name && this.userProfile.surname
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

    console.log(`enum is ${JSON.stringify(this.shippingBuildingType)}`)
    var customerObsv = this.userProfile.id != null ? of(this.userProfile) : this.createCustomer()
    customerObsv.pipe(
      mergeMap(() => {
        this.order = {
          basket : this.storageService.basket,
          customerId: this.userProfile.id,
          shopId: environment.storeId,
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
      this.router.navigate(['../payment'],{ relativeTo: this.route})
    })
  }

}
