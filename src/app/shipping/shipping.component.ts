import { Component, OnInit } from '@angular/core';
import { UserProfile, Order, ShippingData } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { map, mergeMap, catchError } from 'rxjs/operators';
import { from, Observable, of, throwError } from 'rxjs';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  isPhoneNumberVerified = false
  isVerificationRequested = false
  code: string

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
    private router: Router) { }

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

  set phoneNumber(number: string) {
    this.userProfile.mobileNumber =  number
  }

  verify() {
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
            fromAddress: "45 CS lifestyle street",
            toAddress: this.userProfile.address,
            messengerId: "ffd4c856-644f-4453-a5ed-84689801a747",
            buildingType: ShippingData.BuildingTypeEnum.HOUSE,
            type: ShippingData.TypeEnum.DELIVERY,
            additionalInstructions: "call me at 10111"
          }
        }
        return this.izingaOrderManager.startOrder(this.order)
      }))
    .subscribe(order => {
      this.order = order
      this.order.description =  `ord-${this.order.id}`,
      this.storageService.order = order
      this.router.navigate(['payment'])
    })
  }

}
