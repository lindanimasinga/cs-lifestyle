import { Component, OnInit } from '@angular/core';
import { UserProfile, Order, ShippingData } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  userProfile: UserProfile = {
    imageUrl: "https://pbs.twimg.com/media/C1OKE9QXgAAArDp.jpg",
    role: UserProfile.RoleEnum.CUSTOMER
  }
  order: Order;

  constructor(private izingaOrderManager: IzingaOrderManagementService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createCustomer() {
    this.izingaOrderManager.getCustomerByPhoneNumber(this.userProfile.mobileNumber)
    .pipe(
      catchError(error => {
        if(error.status === 404) {
          console.log("Not found user")
          return of(null)
        } else {
          return throwError(error); 
        }
      }),
      mergeMap((profile) => profile != null ? of(profile) : this.izingaOrderManager.registerCustomer(this.userProfile))
    )
    .subscribe(user => {
      this.userProfile = user
      this.storageService.userProfile = user;
      this.startOrder()
    })
  }

  startOrder() {
    this.order = {
      basket : this.storageService.basket,
      customerId: this.userProfile.id,
      shopId: environment.storeId,
      orderType: Order.OrderTypeEnum.ONLINE,
      stage: Order.StageEnum._0CUSTOMERNOTPAID,
      description: `CS order ${this.userProfile.mobileNumber}`,
      shippingData: {
        fromAddress: "45 CS lifestyle street",
        toAddress: this.userProfile.address,
        messengerId: "ffd4c856-644f-4453-a5ed-84689801a747",
        buildingType: ShippingData.BuildingTypeEnum.HOUSE,
        type: ShippingData.TypeEnum.DELIVERY,
        additionalInstructions: "call me at 10111"
      }
    }

    this.izingaOrderManager.startOrder(this.order)
    .subscribe(order => {
      this.order = order
      this.order.description =  `CS order ${this.userProfile.mobileNumber}:${order.id}`,
      this.storageService.order = order
      this.router.navigate(['payment'])
    })
  }

}
