import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ShopItemDescrComponent } from './shop-item-descr/shop-item-descr.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderItemHistoryComponent } from './order-item-history/order-item-history.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MainComponent } from './main/main.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { IzingaHomeComponent } from './izinga-home/izinga-home.component';
import { StoresComponent } from './stores/stores.component';


const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: IzingaHomeComponent },
      { path: 'item/:id', component: ShopItemDescrComponent },
      { path: 'cart', component: CheckoutComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'store-orders', component: OrdersComponent },
      { path: 'order/:id', component: OrderItemHistoryComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'terms-conditions', component: TermsConditionsComponent},
      { path: 'stores', component: StoresComponent}
    ]
  },
  {
    path: ':shortname', component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'item/:id', component: ShopItemDescrComponent },
      { path: 'cart', component: CheckoutComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'store-orders', component: OrdersComponent },
      { path: 'order/:id', component: OrderItemHistoryComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'terms-conditions', component: TermsConditionsComponent},
      { path: 'stores', component: StoresComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
