import { Component, OnInit } from '@angular/core';
import { Stock, StoreProfile } from '../model/models';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { environment } from 'src/environments/environment';

declare var ScrollMagic: any;

@Component({
  selector: 'app-other-items',
  templateUrl: './other-items.component.html',
  styleUrls: ['./other-items.component.css']
})
export class OtherItemsComponent implements OnInit {

  store: StoreProfile;
  shopItems: Stock[];
  
  constructor(private storageService: StorageService, 
    private izingaService: IzingaOrderManagementService) {
  }

  ngOnInit(): void {
    this.izingaService.getStoreById(environment.storeId)
    .subscribe(store => {
      this.store = store
      this.shopItems = store.stockList;
      setTimeout(() => {
        this.initScrollMagic()
      }, 100);
    })
  }

  initScrollMagic() {
    var controller = new ScrollMagic.Controller();
    for (let number = 0; number < this.shopItems.length; number++) {
      new ScrollMagic.Scene({
        triggerElement: `#other-item${number}`,
        reverse: true,
        triggerHook: "1" // move trigger to center of element
      })
        .setClassToggle(`#other-item${number}`, "visible") // add class to reveal
       // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    }
  }

}
