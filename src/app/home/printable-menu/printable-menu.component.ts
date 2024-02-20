import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IzingaOrderManagementService } from 'src/app/service/izinga-order-management.service';
import { StorageService } from 'src/app/service/storage-service.service';

@Component({
  selector: 'app-printable-menu',
  templateUrl: './printable-menu.component.html',
  styleUrls: ['./printable-menu.component.css']
})
export class PrintableMenuComponent extends HomeComponent {

  constructor(izingaService: IzingaOrderManagementService, storage: StorageService, 
    activatedRoute: ActivatedRoute, router: Router, sanitizer:DomSanitizer) {
      super(izingaService, storage, activatedRoute, router, sanitizer)
  }

  ngOnInit() {
    console.log(`store id 2 is ${JSON.stringify(this.activatedRoute.paramMap)}`)
    var shortName =  this.activatedRoute.snapshot.parent.paramMap.get('shortname')
    console.log("shortname is " + shortName)
    if (shortName != this.storage.basket?.storeId) {
      this.storage.clearOrder()
    }
    this.izingaService.getStoreById(shortName)
    .subscribe(shop => {
      this.shop = shop;
      this.categories = new Set(this.shop.stockList.map(stk => stk.group))
      //get promotions
      this.izingaService.getAllPromotionsByStoreId(this.shop.id)
          .subscribe(promotions => {
            this.promotions = promotions
          })
    })
  }

}
