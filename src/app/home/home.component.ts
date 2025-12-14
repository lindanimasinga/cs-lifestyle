import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StoreProfile, Stock, Promotion } from '../model/models';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from '../utils/utils';
import { DomSanitizer } from '@angular/platform-browser';

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
  startOrder = false;
  searchItems: Stock[];

  constructor(protected izingaService: IzingaOrderManagementService, protected storage: StorageService, 
    protected activatedRoute: ActivatedRoute, private router: Router, private sanitizer:DomSanitizer) {
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
      this.storage.shop = shop
      this.categories = new Set(this.shop.stockList.sort((a, b) => this.isPromotion(a) ? -1 : 1).map(stk => stk.group))
      
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

  get cssImageUrl(): String {
    var image = this.sanitizer.bypassSecurityTrustStyle(this.store.imageUrl)
    return `url('${this.store.imageUrl}')`
  }

  shopItems(category?: string): Stock[] {
    return this.shop?.stockList.filter(item => item.group?.toLowerCase() == category?.toLowerCase())
  }

  shopItemsByName(name?: string) {
    this.searchItems = name ? this.shop?.stockList.filter(item => item.name?.toLowerCase().includes(name?.toLowerCase())) : []
  }

  hasItemsInCart(): boolean {
    return this.storage.basket != null && 
      this.storage.basket.storeName == this.shop?.name &&
      this.storage.basket.items.length > 0;
  }

  get cartNumberOfItems() { 
    return this.storage.basket != null? this.storage.basket.items?.length : 0;
  }

  isPromotion(stock: Stock): boolean {
    return this.isPromotionCategory(stock.group)
  }

  isPromotionCategory(category: string): boolean {
    var promoTags = ["deal", "special", "promotion", "promotions", "deals", "specials", "family meals", "featured items"]
    return promoTags.includes(category?.toLowerCase())
  }

  replaceSpecialChars(input?: string): string {
    return input?.replace(/[^a-zA-Z0-9]/g, '_');
  }

  

}
