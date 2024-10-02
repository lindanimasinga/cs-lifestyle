import { Component, OnInit, Input } from '@angular/core';
import { ShopItem } from '../model/shop-item';
import { Stock } from '../model/stock';
import { StoreProfile } from '../model/storeProfile';

declare var ScrollMagic: any;

@Component({
  selector: 'app-shop-item-large',
  templateUrl: './shop-item-large.component.html',
  styleUrls: ['./shop-item-large.component.css']
})
export class ShopItemLargeComponent implements OnInit {

  @Input()
  shopItem: Stock
  @Input()
  themeDark = false;
  @Input()
  shop: StoreProfile

  constructor() { }

  ngOnInit(): void {
  }

  get stockImage() {
    return this.shopItem.images != null && this.shopItem.images[0] != null && this.shopItem.images[0].trim().length != 0 && this.shopItem.images[0] != "https:null" ?
    this.shopItem.images[0] : this.shop.imageUrl
  }

}
