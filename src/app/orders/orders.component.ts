import { Component, OnInit } from '@angular/core';
import { Order } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Array<Order>

  constructor(private izingaOrderManager: IzingaOrderManagementService, private route: Router) { }

  ngOnInit(): void {
    this.izingaOrderManager.getAllOrdersByStoreId(environment.storeId)
      .subscribe(resp => this.orders= resp.filter(order => order.orderType == "ONLINE"))
  }

  statusText(stage : Order.StageEnum) {
    return Order.stageEnumText[stage];
  }

}
