import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, generate } from 'rxjs';
import { Order } from '../model/models';

declare var require: any
var SHA512 = require("crypto-js").SHA512;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }


  private initHeaders(): any {
    var headers: HttpHeaders = new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("Accept", "application/json")
      .append("ApiKey", environment.ozow_api_key)
    return {
      headers: headers
    }
  }

  generatePaymentUrl(order: Order): Observable<string> {

    var ozowPayment: OzowPaymentRequest = {
      SiteCode : environment.ozow_site_code,
      CountryCode: environment.ozow_country_code,
      CurrencyCode: environment.ozow_currency_code,
      Amount: order.totalAmount,
      TransactionReference: order.description,
      BankReference: order.description,
      Customer: "CelesteMoniqueCustomer",
      CancelUrl: environment.ozow_cancel_url,
      ErrorUrl: environment.ozow_error_url ,
      SuccessUrl: environment.ozow_succeess_url,
      IsTest: environment.ozow_is_a_test
    }

     ozowPayment = { SiteCode: "TSTSTE0001",
CountryCode: "ZA",
CurrencyCode: "ZAR",
Amount: 25.05,
TransactionReference: "123",
BankReference: "ABC123",
Customer: "CelesteMoniqueCustomer",
CancelUrl: "http://demo.ozow.com/cancel.aspx",
ErrorUrl: "http://demo.ozow.com/cancel.aspx",
SuccessUrl: "http://demo.ozow.com/success.aspx",
NotifyUrl: "http://demo.ozow.com/notify.aspx",
IsTest: true
    }

    ozowPayment.HashCheck = this.generateHash(ozowPayment);

    return this.http.post(`${environment.ozow_base_url}/PostPaymentRequest`, ozowPayment, this.initHeaders())
        .pipe(
          map(resp => resp['url'] as string)
        )
  }

  generateHash(ozowPayment: OzowPaymentRequest) : string {
    
    var hash = ozowPayment.SiteCode+""+ozowPayment.CountryCode+""+ozowPayment.CurrencyCode+""+ozowPayment.Amount+""+ozowPayment.TransactionReference+""+ozowPayment.BankReference+""+ozowPayment.CancelUrl+""+ozowPayment.ErrorUrl+""+ozowPayment.SuccessUrl+""+ozowPayment.NotifyUrl+""+ozowPayment.IsTest
    hash = hash + environment.ozow_private_key
    console.log(hash.toLowerCase())
    //hash = "tstste0001zazar25.00123abc123http://demo.ozow.com/cancel.aspxhttp://demo.ozow.com/cancel.aspxhttp://demo.ozow.com/success.aspxhttp://demo.ozow.com/notify.aspxfalse215114531aff7134a94c88ceea48e";
    return "" + SHA512(hash.toLowerCase());
  }

  static generateReference(orderID: string, userId: string): string {
    return `${orderID}:${userId}`
  }

  static getCelebIdfromReference(transactionReference: string): number {
    return Number.parseInt(transactionReference.split(':')[0])
  }
}

class OzowPaymentRequest {

  SiteCode: string;
  CountryCode: string;
  CurrencyCode: string;
  Amount: number;
  TransactionReference: string;
  BankReference: string;
  Customer: string;
  SuccessUrl: string;
  CancelUrl: string;
  ErrorUrl: string;
  NotifyUrl?: string;
  IsTest;
  HashCheck?: string;
}