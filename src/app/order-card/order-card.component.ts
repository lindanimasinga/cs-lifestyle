import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
      window.location.href = `${environment.izingaPayUrl}?Status=init&type=yoco&TransactionReference=${this.order.id}&callback=${environment.ozow_succeess_url}`
    } else {
      this.router.navigate([`/${this.order.shopId}/order/${this.order.id}`], { queryParams: 
        {"Status": "unpaid", "type": "none", 
        "TransactionReference": this.order.id}})
    }
  }

}
