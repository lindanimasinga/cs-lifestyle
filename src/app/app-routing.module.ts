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
import { PrintableMenuComponent } from './home/printable-menu/printable-menu.component';
import { LoginComponent } from './login/login.component';
import { RecurringShoppingComponent } from './recurring-shopping/recurring-shopping.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecurringShoppingFormComponent } from './recurring-shopping-form/recurring-shopping-form.component';


const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {path : 'login', component: LoginComponent},
      {path : 'recurring', component: RecurringShoppingComponent},
      {path : 'recurring-form', component: RecurringShoppingFormComponent},
      {path : 'dashboard', component: DashboardComponent},
      { path: '', component: IzingaHomeComponent },
      { path: 'item/:id', component: ShopItemDescrComponent },
      { path: 'cart', component: CheckoutComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'order/:id', component: OrderItemHistoryComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'terms-conditions', component: TermsConditionsComponent},
      { path: 'stores', component: StoresComponent},
      { path: 'printable', component: PrintableMenuComponent}
    ]
  },
  {
    path: ':shortname', component: MainComponent,
    children: [
      {path : 'login', component: LoginComponent},
      {path : 'recurring', component: RecurringShoppingComponent},
      {path : 'recurring-form', component: RecurringShoppingFormComponent},
      {path : 'dashboard', component: DashboardComponent},
      { path: '', component: HomeComponent },
      { path: 'item/:id', component: ShopItemDescrComponent },
      { path: 'cart', component: CheckoutComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'order/:id', component: OrderItemHistoryComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'terms-conditions', component: TermsConditionsComponent},
      { path: 'stores', component: StoresComponent},
      { path: 'printable', component: PrintableMenuComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' ,  scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
