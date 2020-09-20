import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ShopItemDescrComponent } from './shop-item-descr/shop-item-descr.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'item/:id', component: ShopItemDescrComponent },
  { path: 'cart', component: CheckoutComponent },
  {path : 'shipping', component: ShippingComponent},
  {path : 'payment', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
