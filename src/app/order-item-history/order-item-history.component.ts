import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import { environment } from 'src/environments/environment';
import { Order, UserProfile } from '../model/models';
import { interval } from 'rxjs';

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
    const orderId = this.route.snapshot.paramMap.get('id');
    if(this.storageService.orders != null) {
      var orders = this.storageService.orders
      this.order = orders.find(item => item.id == orderId)
      this.getCustomerDetails(this.order.customerId)
      return
    } 
    
    this.izingaService.getOrderById(orderId)
      .subscribe(order => {
        this.order = order
        this.getCustomerDetails(order.customerId)
    })
    
    interval(10000).subscribe(() =>this.fetchOrder())
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

  statusColor(stage : Order.StageEnum) {
    return Order.stageEnumColor[stage];
  }

  get mobileNumber() {
   return this.customer.mobileNumber.startsWith("0") ? 
      this.customer.mobileNumber.replace('0', "+27") : 
      this.customer.mobileNumber.startsWith("27") ? this.customer.mobileNumber.replace('27', "+27") : this.customer.mobileNumber 
  }

  fetchOrder () {
    this.izingaService.getOrderById(this.order.id)
        .subscribe(resp => this.order = resp)
  }

}
