import { Component, OnInit } from '@angular/core';
import { Order, StoreProfile } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
    var shopId = this.activeRoute.parent.snapshot.paramMap.get('shortname')
    this.izingaOrderManager.getAllOrdersByStoreId(shopId)
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
