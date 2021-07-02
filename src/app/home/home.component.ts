import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StoreProfile, Stock, Promotion } from '../model/models';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../utils/utils';

declare var Flickity: any;
declare var ScrollMagic: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images: Array<String>
  promotions: Promotion[] = [
  ]

  constructor(private storageService: StorageService,
    private izingaService: IzingaOrderManagementService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
      console.log(`store id 2 is ${JSON.stringify(this.activatedRoute.paramMap)}`)
      
    var shortName =  this.activatedRoute.snapshot.paramMap.get('shortname')
    console.log("shortname is " + shortName)
    this.izingaService.getStoreById(shortName)
    .subscribe(shop => {
      this.storageService.shop = shop;
      //init scrolling
      setTimeout(() => {this.initScrollMagic()}, 100);
      //get promotions
      this.izingaService.getAllPromotionsByStoreId(this.store.id)
          .subscribe(promotions => {
            this.promotions = promotions
            setTimeout(() => {
              this.initCarousel()
              this.initScrollMagicForPromotions()
            }, 100);
            setTimeout(() => Utils.applyCustomeTheme(this.store.brandPrimaryColor, this.store.brandSecondaryColor), 100)
          })
    })
  }

  ngAfterViewInit() {
    //this.initCarousel()
  }

  get store(): StoreProfile {
    return this.storageService.shop
  }

  get shopItems(): Stock[] {
    return this.storageService.shop?.stockList
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
