import { Component, OnInit } from '@angular/core';
import { Order } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Array<Order>

  constructor(private izingaOrderManager: IzingaOrderManagementService) { }

  ngOnInit(): void {
    this.izingaOrderManager.getAllOrdersByMobileNumber("0812815707")
      .subscribe(resp => this.orders= resp)
  }

  statusText(stage : Order.StageEnum) {
    console.log(stage)
    
    return Order.stageEnumText[stage];
  }

}
