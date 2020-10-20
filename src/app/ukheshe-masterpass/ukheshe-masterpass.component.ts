import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../model/models';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { UkhesheService } from '../service/ukheshe.service';
import { mergeMap, map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-ukheshe-masterpass',
  templateUrl: './ukheshe-masterpass.component.html',
  styleUrls: ['./ukheshe-masterpass.component.css']
})
export class UkhesheMasterpassComponent implements OnInit {

  @Input() order: Order
  ukhesheMasterpassCodeSuccess: boolean
  paymentBusy = false;
  paymentSuccesful = false
  orderCompleted = false
  value: string

  constructor(private storageService: StorageService,
    private izingaService: IzingaOrderManagementService,
    private ukhesheService: UkhesheService) { 
      this.order = this.storageService.order;
      this.order.shippingData.fee
  }

  ngOnInit() {
    this.ukhesheGenMasterPass()
  }

  ukhesheGenMasterPass() {
    this.paymentBusy = true
    this.ukhesheService.generateMasterPassCode(this.order.totalAmount)
      .subscribe(qrCodeUkheshe => {
        this.ukhesheMasterpassCodeSuccess = true;
        this.value = qrCodeUkheshe?.code
        console.log("code is " + this.value)
        },
        (error) => {
          console.log("error is " + error)  
        },
        () => this.paymentBusy = false
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
        },
        () => {},
        () => this.paymentBusy = false,
      )
  }

}
