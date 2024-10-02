import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ShopItemDescrComponent } from './shop-item-descr/shop-item-descr.component';
import { HomeComponent } from './home/home.component';
import { IzingaOrderManagementService} from './service/izinga-order-management.service'
import {UkhesheService} from './service/ukheshe.service'
import {FirebaseService} from './service/firebase.service'
import { StorageService} from './service/storage-service.service';
import {PaymentService}  from './service/payment.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import { OtherItemsComponent } from './other-items/other-items.component';
import { UkheshePaymentComponent } from './ukheshe-payment/ukheshe-payment.component';
import { UkhesheSignupComponent } from './ukheshe-signup/ukheshe-signup.component';
import { UkhesheMasterpassComponent } from './ukheshe-masterpass/ukheshe-masterpass.component';
import { OrderItemHistoryComponent } from './order-item-history/order-item-history.component';
import { OzowPaymentComponent } from './ozow-payment/ozow-payment.component';
import { PlaceAutocompleteComponent } from './place-autocomplete/place-autocomplete.component';
import { PayfastComponent } from './payfast/payfast.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MainComponent } from './main/main.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { IzingaHomeComponent } from './izinga-home/izinga-home.component';
import { StoresComponent } from './stores/stores.component';
import { StoreCardComponent } from './store-card/store-card.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PromoSliderComponent } from './promotion/promo-slider/promo-slider.component';
import { PrintableMenuComponent } from './home/printable-menu/printable-menu.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShopItemLargeComponent } from './shop-item-large/shop-item-large.component';


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
    UkhesheMasterpassComponent,
    OrderItemHistoryComponent,
    OzowPaymentComponent,
    PlaceAutocompleteComponent,
    PayfastComponent,
    ContactUsComponent,
    MainComponent,
    TermsConditionsComponent,
    IzingaHomeComponent,
    StoresComponent,
    StoreCardComponent,
    OrderCardComponent,
    PromotionComponent,
    PromoSliderComponent,
    PrintableMenuComponent,
    ShopItemLargeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    NgxQRCodeModule,
    MatToolbarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  providers: [
    IzingaOrderManagementService,
    StorageService,
    PaymentService,
    UkhesheService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


