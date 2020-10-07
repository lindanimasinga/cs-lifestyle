import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import { environment } from 'src/environments/environment';
import { Order, UserProfile } from '../model/models';

@Component({
  selector: 'app-order-item-history',
  templateUrl: './order-item-history.component.html',
  styleUrls: ['./order-item-history.component.css']
})
export class OrderItemHistoryComponent implements OnInit {

  order: Order
  customer: UserProfile;

  constructor(private route: ActivatedRoute,
    private izingaService: IzingaOrderManagementService,
    private storageService: StorageService) { }

  ngOnInit() {

    this.route.params.subscribe(param => {
      if (param["id"]) {
        const orderId = this.route.snapshot.paramMap.get('id');
        if(this.storageService.orders != null) {
          var orders = this.storageService.orders
          this.order = orders.find(item => item.id == orderId)
          this.getCustomerDetails(this.order.customerId)
        } else {
          this.izingaService.getOrderById(orderId)
            .subscribe(order => {
              this.order = order
              this.getCustomerDetails(order.customerId)
            })
        }
      }
    });
  }

  getCustomerDetails(customerId: string) {
    this.izingaService.getCustomerById(customerId)
      .subscribe(customer => {
        this.customer = customer
      })
  }

  statusText(stage : Order.StageEnum) {
    return Order.stageEnumText[stage];
  }

}
