import { Component, OnInit } from '@angular/core';
import { Order, StoreProfile } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../service/storage-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Array<Order>

  constructor(private izingaOrderManager: IzingaOrderManagementService, private storage: StorageService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    var customerId = this.activeRoute.parent.snapshot.queryParamMap.get('userId')
    this.izingaOrderManager.getAllOrdersByCustomer(customerId)
      .subscribe(resp => this.orders= resp.filter(order => order.orderType == "ONLINE"))
  }

  statusText(stage : Order.StageEnum) {
    return Order.stageEnumText[stage];
  }

  get completedOrders() {
    return this.orders.filter(it => it.stage == 'STAGE_7_ALL_PAID')
  }

  get currentOrders() {
    return this.orders.filter(it => it.stage != 'STAGE_7_ALL_PAID')
  }

}
