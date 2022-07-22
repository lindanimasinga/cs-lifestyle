import { Component, Input, OnInit } from '@angular/core';
import { Promotion } from 'src/app/model/promotion';

declare var Flickity: any;
declare var ScrollMagic: any;

@Component({
  selector: 'app-promo-slider',
  templateUrl: './promo-slider.component.html',
  styleUrls: ['./promo-slider.component.css']
})
export class PromoSliderComponent implements OnInit {

  @Input()
  promotions: Array<Promotion>

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initCarousel()
      this.initScrollMagicForPromotions()
    }, 100);
  }

  initCarousel() {
    var elem = document.querySelector('.carousel');
    new Flickity(elem, {
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
