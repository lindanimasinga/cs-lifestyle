import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StoreProfile, Stock, Promotion } from '../model/models';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images: Array<String>
  promotions: Promotion[] = []
  categories: Set<String> = new Set<String>()
  shop: StoreProfile;

  constructor(private izingaService: IzingaOrderManagementService, private storage: StorageService, 
    private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log(`store id 2 is ${JSON.stringify(this.activatedRoute.paramMap)}`)
    var shortName =  this.activatedRoute.snapshot.paramMap.get('shortname')
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

  ngAfterViewInit() {
    //this.initCarousel()
  }

  get store(): StoreProfile {
    return this.shop
  }

  shopItems(category?: string): Stock[] {
    return this.shop?.stockList.filter(item => item.group?.toLowerCase() == category?.toLowerCase())
  }

  hasItemsInCart(): boolean {
    return this.storage.basket != null && 
      this.storage.basket.storeName == this.shop?.name &&
      this.storage.basket.items.length > 0;
  }

  get cartNumberOfItems() { 
    return this.storage.basket != null? this.storage.basket.items?.length : 0;
  }

}
