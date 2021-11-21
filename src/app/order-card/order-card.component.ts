import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../model/order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input()
  order: Order

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  statusText(stage : Order.StageEnum) {
    return Order.stageEnumText[stage];
  }

  statusColor(stage : Order.StageEnum) {
    return Order.stageEnumColor[stage];
  }

  viewOrderDetails() {
    if(this.order.stage == Order.StageEnum._0CUSTOMERNOTPAID) {
      this.router.navigate([`${this.order.shopId}/payment`], { queryParams: 
        {"Status": "unpaid", "type": "none", 
        "TransactionReference": this.order.id}})
    } else {
      this.router.navigate([`/${this.order.shopId}/order/${this.order.id}`], { queryParams: 
        {"Status": "unpaid", "type": "none", 
        "TransactionReference": this.order.id}})
    }
  }

}
