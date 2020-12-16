import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StoreProfile, Stock, Promotion } from '../model/models';
import { environment } from 'src/environments/environment';

declare var Flickity: any;
declare var ScrollMagic: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images: Array<String>
  store: StoreProfile;
  shopItems: Stock[];
  promotions: Promotion[] = [
  ]

  constructor(private storageService: StorageService,
    private izingaService: IzingaOrderManagementService) {
  }

  ngOnInit() {

    this.izingaService.getStoreById(environment.storeId)
      .subscribe(store => {
        this.store = store
        this.storageService.shop = this.store
        this.shopItems = store.stockList;
        setTimeout(() => {
          this.initScrollMagic()
        }, 100);
      })

    this.izingaService.getAllPromotionsByStoreId(environment.storeId)
      .subscribe(promotions => {
        this.promotions = promotions
        setTimeout(() => {
          this.initCarousel()
          this.initScrollMagicForPromotions()
        }, 100);
      })
  }

  ngAfterViewInit() {
    //this.initCarousel()
  }

  initCarousel() {
    var elem = document.querySelector('.carousel');
    new Flickity(elem, {
      // options
      "autoPlay": 5000,
      "imagesLoaded": true,
      "percentPosition": false
    })
  }

  initScrollMagic() {
    var controller = new ScrollMagic.Controller();
    for (let number = 0; number < this.shopItems.length; number++) {
      new ScrollMagic.Scene({
        triggerElement: `#item${number}`,
        reverse: true,
        triggerHook: "0.9" // move trigger to center of element
      })
        .setClassToggle(`#item${number}`, "visible") // add class to reveal
       // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    }
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
