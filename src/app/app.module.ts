import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ShopItemDescrComponent } from './shop-item-descr/shop-item-descr.component';
import { HomeComponent } from './home/home.component';
import { IzingaOrderManagementService} from './service/izinga-order-management.service'
import {UkhesheService} from './service/ukheshe.service'
import { StorageService} from './service/storage-service.service';
import {PaymentService}  from './service/payment.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import { OtherItemsComponent } from './other-items/other-items.component';
import { UkheshePaymentComponent } from './ukheshe-payment/ukheshe-payment.component';
import { UkhesheSignupComponent } from './ukheshe-signup/ukheshe-signup.component';
import { UkhesheMasterpassComponent } from './ukheshe-masterpass/ukheshe-masterpass.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopItemComponent,
    ShopItemDescrComponent,
    HomeComponent,
    CheckoutComponent,
    ShippingComponent,
    PaymentComponent,
    OrdersComponent,
    OtherItemsComponent,
    UkheshePaymentComponent,
    UkhesheSignupComponent,
    UkhesheMasterpassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    NgxQRCodeModule
  ],
  providers: [
    IzingaOrderManagementService,
    StorageService,
    PaymentService,
    UkhesheService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
