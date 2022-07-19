import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CurrentLocation } from '../model/current-location';
import { Order } from '../model/order';
import { Promotion } from '../model/promotion';
import { StoreProfile } from '../model/storeProfile';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';

declare var Flickity: any;
declare var ScrollMagic: any;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  stores: StoreProfile[] = []
  promotions: Promotion[] = []
  currentOrders: Order[]
  address: string
  
  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private izingaService: IzingaOrderManagementService, private storage: StorageService) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe(queryParamMap => {
    var lat: number = queryParamMap['lat']
    var long: number = queryParamMap['long']
    this.address = queryParamMap['address'] 
    this.storage.currentLocation = new CurrentLocation(lat, long, this.address)
    this.storage.shop = null
    this.izingaService.getAllStores(lat, long, 0.1)
        .pipe(
          map(stores => stores.filter(store => !store.storeOffline))
        )
        .subscribe(resp => this.stores = resp)
    
    this.izingaService.getAllPromotions(lat, long, 0.1)
        .subscribe(resp => {
          this.promotions = resp
          setTimeout(() => {
            this.initCarousel()
            this.initScrollMagicForPromotions()
          }, 100);
        })
    
    })

    this.fetchOrders()
    interval(10000).subscribe(() =>this.fetchOrders())
  }


  fetchOrders () {
    var userId = this.storage.userProfile?.id
    this.izingaService.getAllOrdersByCustomer(userId)
        .pipe(
          map(orders => orders
            .filter(
              store => store.stage != Order.StageEnum._7ALLPAID
              )
            )
          )
        .subscribe(resp => this.currentOrders = resp)
  }
  

  changeAddress() {
    this.storage.currentLocation = null
    this.router.navigate(['/'])
  }

  hasOrders() {
    return this.currentOrders != null && this.currentOrders.length > 0
  }

  initCarousel() {
    var elem = document.querySelector('.carousel');
    new Flickity(elem, {
      // options
      "autoPlay": 5000,
      "imagesLoaded": true,
      "percentPosition": false,
      "wrapAround": true
    })
  }

  initScrollMagicForPromotions() {
  
    var controller = new ScrollMagic.Controller();
    
    new ScrollMagic.Scene({
      triggerElement: `.carousel`,
      reverse: true,
      triggerHook: "0.9" // move trigger to center of element
    })
      .setClassToggle(`.carousel`, "visible") // add class to reveal
     // .addIndicators() // add indicators (requires plugin)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#promotion1",
      reverse: true,
      triggerHook: "0.9" // move trigger to center of element
    })
      .setClassToggle(`#promotion1`, "visible") // add class to reveal
   //   .addIndicators() // add indicators (requires plugin)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#promotion2",
      reverse: true,
      triggerHook: "0.9" // move trigger to center of element
    })
      .setClassToggle("#promotion2", "visible") // add class to reveal
      //.addIndicators() // add indicators (requires plugin)
      .addTo(controller);
  }

}
