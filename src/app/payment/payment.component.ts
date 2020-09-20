import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { Order } from '../model/models';
import { StorageService } from '../service/storage-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  ozowPaymentUrl: string
  order: Order
  ukhesheUsername: string
  ukheshePassword: string
  paymentSelected: string

  constructor(private paymentService: PaymentService, 
    private storageService: StorageService) { 
      this.order = this.storageService.order;
  }

  ngOnInit(): void {
   this.paymentService.generatePaymentUrl(this.order)
    .subscribe(url => {
      this.ozowPaymentUrl = url;
    })
  }



}
