import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../model/order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input()
  order: Order

  constructor() { }

  ngOnInit(): void {
  }

  statusText(stage : Order.StageEnum) {
    return Order.stageEnumText[stage];
  }

  statusColor(stage : Order.StageEnum) {
    return Order.stageEnumColor[stage];
  }

}
