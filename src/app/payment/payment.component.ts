import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { Order } from '../model/models';
import { StorageService } from '../service/storage-service.service';
import { UkhesheService } from '../service/ukheshe.service';
import { mergeMap, map, delay } from 'rxjs/operators';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  ozowPaymentUrl: string
  order: Order;
  //= { "id": `${Math.random() * 10000000}`, "stage": "STAGE_0_CUSTOMER_NOT_PAID", "shippingData": { "id": null, "fromAddress": "45 CS lifestyle street", "toAddress": "41 Sheffield Cl, Milnerton Rural, Cape Town, 7441, South Africa", "buildingType": "HOUSE", "unitNumber": null, "buildingName": null, "additionalInstructions": "call me at 10111", "type": "DELIVERY", "fee": 20.0, "messengerId": "ffd4c856-644f-4453-a5ed-84689801a747", "pickUpTime": null }, "basket": { "id": null, "items": [{ "name": "Jumpsuit", "quantity": 3, "price": 4.0, "discountPerc": 0.0, "options": [{ "name": "Size", "values": ["30", "32", "34", "38", "40"], "selected": "32", "price": 0.0 }, { "name": "Colour", "values": ["Blue", "Black", "White", "Orange"], "selected": "Black", "price": 0.0 }] }, { "name": "Jumpsuit", "quantity": 1, "price": 4.0, "discountPerc": 0.0, "options": [{ "name": "Size", "values": ["30", "32", "34", "38", "40"], "selected": "32", "price": 0.0 }, { "name": "Colour", "values": ["Blue", "Black", "White", "Orange"], "selected": "Black", "price": 0.0 }] }, { "name": "Jumpsuit", "quantity": 1, "price": 4.0, "discountPerc": 0.0, "options": [{ "name": "Size", "values": ["30", "32", "34", "38", "40"], "selected": "32", "price": 0.0 }, { "name": "Colour", "values": ["Blue", "Black", "White", "Orange"], "selected": "Black", "price": 0.0 }] }] }, "customerId": "ffd4c856-644f-4453-a5ed-84689801a747", "shopId": "d4bf58f4-44eb-4402-8ee9-b457c263833e", "description": "order from ffd4c856-644f-4453-a5ed-84689801a747", "paymentType": null, "orderType": "ONLINE", "hasVat": false, "shopPaid": false, "serviceFee": 5.0, "messengerPaid": false, "basketAmount": 12.0, "totalAmount": 15.0 }
  ukhesheUsername: string
  ukheshePassword: string
  paymentSelected = "ozow"
  ukhesheLoginSuccess: boolean
  paymentBusy = false;
  paymentSuccesful = false
  orderCompleted = false
  shopName: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private storageService: StorageService,
    private izingaService: IzingaOrderManagementService) {
    this.order = this.storageService.order;
    this.order.shippingData.fee
  }

  //http://localhost:4200/payment?SiteCode=CUR-CEL-001&TransactionId=6653476b-7628-4505-9fff-e41c59b2c9ee&TransactionReference=ord-1602523706&Amount=3.05&Status=Cancelled&Optional1=&Optional2=&Optional3=&Optional4=&Optional5=&CurrencyCode=ZAR&IsTest=False&StatusMessage=Transaction%20was%20cancelled&Hash=15a977edb6593967155ff7e3dda46ee45d46797b78d84eb0e6d4d273c5c5284880b0e2b87526b5c628d98616517045b53dca9cbe6eb965e324b57627ff271a41

  ngOnInit(): void {

    if (this.order != null) {
      this.shopName = this.storageService.shop?.name
      this.paymentService.generatePaymentUrl(this.order, this.shopName)
        .subscribe(url => {
          this.ozowPaymentUrl = url;
        })
    }

    this.route.queryParams.subscribe(queryParamMap => {
      var transactionId = queryParamMap['TransactionId']
      var transactionRef: string = queryParamMap['TransactionReference']
      var status = queryParamMap['Status']
      var paymentType: string = queryParamMap['type']
      var orderId = transactionRef.replace("ord-", "")
      console.log(`transaction id is ${transactionId}`)
      console.log(`status id is ${status}`)
      console.log(`transactionRef id is ${transactionRef}`)

      this.paymentBusy = true
      this.izingaService.getOrderById(orderId)
        .pipe(
          mergeMap(order => {
            if (status == "Complete") {
              this.order = order
              if(paymentType !== null && paymentType.toLocaleLowerCase() == "payfast") {
                this.order.description = "payfast-" + transactionId
                this.order.paymentType = "PAYFAST"
              } else {
                this.order.description = "ozow-" + transactionId
                this.order.paymentType = "OZOW"
              }
              
              return this.izingaService.finishOrder(this.order).
                pipe(
                  map(order => {
                    this.storageService.clearOrder()
                    return order
                  })
                )
            }
            return of(order)
          })
        ).subscribe(order => {
          this.order = order
          this.storageService.order = order
          if(order.stage == Order.StageEnum._1WAITINGSTORECONFIRM) {
            this.router.navigate(['../order', order.id], {relativeTo: this.route})
          }

          this.shopName = this.storageService?.shop?.name
          if(this.shopName == null) {
            this.izingaService.getStoreById(order.shopId)
              .subscribe(shop => this.shopName = shop.name)
          }
        },
          (error) => {
            console.log("error is " + error)
          },
          () => this.paymentBusy = false
        )
    })

  }





}
