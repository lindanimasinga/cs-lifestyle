import { Component, OnInit } from '@angular/core';
import { UserProfile, Order, ShippingData } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import { environment } from 'src/environments/environment';
import { BuiltinType } from '@angular/compiler';
import { Router } from '@angular/router';

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
    this.izingaOrderManager.registerCustomer(this.userProfile)
    .subscribe(user => {
      this.userProfile = user
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
      description: `order from ${this.userProfile.id}`,
      shippingData: {
        fromAddress: "CS-lifestyle-address",
        toAddress: this.userProfile.address,
        buildingName: "",
        buildingType: ShippingData.BuildingTypeEnum.HOUSE,
        unitNumber: "",
        type: ShippingData.TypeEnum.DELIVERY,
        additionalInstructions: "call me"
      }
    }

    this.izingaOrderManager.startOrder(this.order)
    .subscribe(order => {
      this.order = order
      this.storageService.order = order
      this.router.navigate(['payment'])
    })
  }

}
