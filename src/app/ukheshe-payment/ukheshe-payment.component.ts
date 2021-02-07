import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../model/models';
import { PaymentService } from '../service/payment.service';
import { UkhesheService } from '../service/ukheshe.service';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { mergeMap, map, delay, catchError } from 'rxjs/operators';
import { UkhesheUser } from '../model/ukheshe-user';
import { throwError } from 'rxjs/internal/observable/throwError';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ukheshe-payment',
  templateUrl: './ukheshe-payment.component.html',
  styleUrls: ['./ukheshe-payment.component.css']
})
export class UkheshePaymentComponent implements OnInit {

  ozowPaymentUrl: string
  @Input() order: Order
  ukhesheUsername: string
  ukheshePassword: string
  ukhesheLoginSuccess: boolean
  paymentBusy = false;
  paymentSuccesful = false
  orderCompleted = false
  ukhesheUserData: UkhesheUser;
  hasError: boolean = false;
  errorMessage: string
  ukhesheDownloadUrl: string;
  
  constructor(private storageService: StorageService,
    private izingaService: IzingaOrderManagementService,
    private ukhesheService: UkhesheService) { 
      this.order = this.storageService.order;
      this.order.shippingData.fee
  }

  ngOnInit(): void {
    this.ukhesheDownloadUrl = this.isAppleDevice ? environment.ukhesheAppleUrl : environment.ukhesheAndroidUrl;
  }

  get isAppleDevice() : boolean {
      return window.navigator.userAgent.toLowerCase().includes("iphone") ||
      window.navigator.userAgent.toLowerCase().includes("ipad") || 
      window.navigator.userAgent.toLowerCase().includes("macintosh")
  }

  get insufficientFunds(): boolean {
    return this.ukhesheUserData != null && this.ukhesheUserData.availableBalance <= this.order.totalAmount
  }

  ukhesheLogin() {
    this.paymentBusy = true
    this.ukhesheService.login(this.ukhesheUsername, this.ukheshePassword)
      .pipe(
        mergeMap(() => this.ukhesheService.userInfo(this.ukhesheUsername)))
      .subscribe(user => {
        this.ukhesheLoginSuccess = true;
        this.ukhesheUserData = user
        },
        (error) => {
          this.paymentBusy = false
          this.hasError = true
          this.errorMessage = error
        },
        () => {
          console.log("login done")
          this.paymentBusy = false
        }
      )
  }

  isUkhesheLoggedIn() {
    return this.storageService.jwt != null
  }

  payForOrder() {
    this.paymentBusy = true
    this.ukhesheService.payForOrder(this.order)
      .pipe(
        map((data) => {
          this.paymentSuccesful = true;
          this.order.paymentType = "UKHESHE"
          return data
        }),
        delay(5000),
        mergeMap(() => this.izingaService.finishOrder(this.order))
      )
      .subscribe(
        (order) => {
          this.storageService.order = order
          this.orderCompleted = true;
          this.storageService.clearOrder()
        },
        () => {},
        () => this.paymentBusy = false,
      )
  }

  openOrderPage() {
    
  }

}
