import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order';

declare var require: any
var MD5 = require("crypto-js").MD5;

@Component({
  selector: 'app-payfast',
  templateUrl: './payfast.component.html',
  styleUrls: ['./payfast.component.css']
})
export class PayfastComponent implements OnInit {

  @Input() order: Order
  orderHash: string
  @Input()
  storeName: string
  environment = environment
  data = []

  constructor() { }

  ngOnInit(): void {
    var dataMap = new Map<string, any>([
      ["merchant_id" , environment.payfast_merchant_id],
      ["merchant_key" , environment.payfast_merchant_key],
      ["amount" , `${this.order.totalAmount}`],
      ["item_name", this.storeName],
      ["return_url", `${environment.ozo_payment_notify_url}?Status=Complete&type=payfast&TransactionReference=${this.order.id}`],
      ["cancel_url", `${environment.ozow_payment_cancel_url}?Status=cancel&type=payfast&TransactionReference=${this.order.id}`],
      ["notify_url", `${environment.ozo_payment_notify_url}?Status=Complete&type=payfast&TransactionReference=${this.order.id}`],
      ["m_payment_id",  this.order.id]
    ])

    this.orderHash = this.generateSignature(dataMap)
    //dataMap.set("signature", this.orderHash)
    for (let entry of dataMap) {
      console.log(`entry value is ${entry[0]}`)
      this.data.push(entry)
    }

  }

  get paymentUrl() {
    return `${environment.payFastUrl}?cmd=_paynow&receiver=11522007&item_name=Celeste+Clothing-${this.order.id}&item_description=Online-Shop&amount=${this.order.totalAmount}&return_url=${environment.ozo_payment_notify_url}&cancel_url=${environment.ozow_payment_cancel_url}`
  }


  generateSignature(data: {[key:string]:any; }, passPhrase = null): string{
    // Create parameter string
    let pfOutput = "";
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] !== "") {
          pfOutput += `${key}=${encodeURIComponent(data[key]).trim().replace(/%20/g, " + ")}&`
        }
      }
    }

    // Remove last ampersand
    let getString = pfOutput.slice(0, -1);
    if (passPhrase !== null) {
      getString += `&passphrase=${encodeURIComponent(passPhrase).trim().replace(/%20/g, "+")}`;
    }
    return MD5(getString);
  };

}
