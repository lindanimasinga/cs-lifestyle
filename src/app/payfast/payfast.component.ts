import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order';
import { StorageService } from '../service/storage-service.service';

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
  ozo_payment_notify_url = environment.ozo_payment_notify_url
  ozow_succeess_url = environment.ozow_succeess_url
  ozow_payment_cancel_url = environment.ozow_payment_cancel_url
  ozow_error_url = environment.ozow_error_url
  data = []

  constructor(private storage: StorageService) { }

  ngOnInit(): void {

    if(window.location.href.includes(this.storage.shop.shortName)) {
      console.log("href is " + window.location.href)
      console.log("shop is " + this.storage.shop.id)
      this.ozo_payment_notify_url = `${window.location.origin}/${this.storage.shop.shortName}/payment`
      this.ozow_succeess_url = `${window.location.origin}/${this.storage.shop.shortName}/payment`
      this.ozow_payment_cancel_url =`${window.location.origin}/${this.storage.shop.shortName}/payment`
      this.ozow_error_url = `${window.location.origin}/${this.storage.shop.shortName}/payment` 
    }

    var dataMap = new Map<string, any>([
      ["merchant_id" , environment.payfast_merchant_id],
      ["merchant_key" , environment.payfast_merchant_key],
      ["amount" , `${this.order.totalAmount}`],
      ["item_name", this.storeName],
      ["return_url", `${this.ozo_payment_notify_url}?Status=Complete&type=payfast&TransactionReference=${this.order.id}`],
      ["cancel_url", `${this.ozow_payment_cancel_url}?Status=cancel&type=payfast&TransactionReference=${this.order.id}`],
      ["notify_url", `${this.ozo_payment_notify_url}?Status=Complete&type=payfast&TransactionReference=${this.order.id}`],
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
    return `${environment.payFastUrl}?cmd=_paynow&receiver=11522007&item_name=Celeste+Clothing-${this.order.id}&item_description=Online-Shop&amount=${this.order.totalAmount}&return_url=${this.ozo_payment_notify_url}&cancel_url=${this.ozow_payment_cancel_url}`
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
