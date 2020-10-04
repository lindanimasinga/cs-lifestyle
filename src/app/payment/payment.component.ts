import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { Order } from '../model/models';
import { StorageService } from '../service/storage-service.service';
import { UkhesheService } from '../service/ukheshe.service';
import { mergeMap, map, delay } from 'rxjs/operators';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  ozowPaymentUrl: string
  order: Order = {"id": `${Math.random() * 10000000}`,"stage":"STAGE_0_CUSTOMER_NOT_PAID","shippingData":{"id":null,"fromAddress":"45 CS lifestyle street","toAddress":"41 Sheffield Cl, Milnerton Rural, Cape Town, 7441, South Africa","buildingType":"HOUSE","unitNumber":null,"buildingName":null,"additionalInstructions":"call me at 10111","type":"DELIVERY","fee":20.0,"messengerId":"ffd4c856-644f-4453-a5ed-84689801a747","pickUpTime":null},"basket":{"id":null,"items":[{"name":"Jumpsuit","quantity":1,"price":4.0,"discountPerc":0.0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"32","price":0.0},{"name":"Colour","values":["Blue","Black","White","Orange"],"selected":"Black","price":0.0}]},{"name":"Jumpsuit","quantity":1,"price":4.0,"discountPerc":0.0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"32","price":0.0},{"name":"Colour","values":["Blue","Black","White","Orange"],"selected":"Black","price":0.0}]},{"name":"Jumpsuit","quantity":1,"price":4.0,"discountPerc":0.0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"32","price":0.0},{"name":"Colour","values":["Blue","Black","White","Orange"],"selected":"Black","price":0.0}]}]},"customerId":"ffd4c856-644f-4453-a5ed-84689801a747","shopId":"d4bf58f4-44eb-4402-8ee9-b457c263833e","description":"order from ffd4c856-644f-4453-a5ed-84689801a747","paymentType":null,"orderType":"ONLINE","hasVat":false,"shopPaid":false,"serviceFee":5.0,"messengerPaid":false,"basketAmount":12.0,"totalAmount":15.0}
  ukhesheUsername: string
  ukheshePassword: string
  paymentSelected = "ukheshe"
  ukhesheLoginSuccess: boolean
  paymentBusy = false;
  paymentSuccesful = false
  orderCompleted = false

  constructor(private paymentService: PaymentService, 
    private storageService: StorageService,
    private izingaService: IzingaOrderManagementService) { 
      this.order = this.storageService.order;
      this.order.shippingData.fee
  }

  ngOnInit(): void {
   this.paymentService.generatePaymentUrl(this.order)
    .subscribe(url => {
      this.ozowPaymentUrl = url;
    })
  }





}
