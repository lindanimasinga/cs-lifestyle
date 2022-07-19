import { Component, OnInit, Input } from '@angular/core';
import { ShopItem } from '../model/shop-item';
import { Stock } from '../model/stock';
import { StoreProfile } from '../model/storeProfile';

declare var ScrollMagic: any;

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {

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
    return this.shopItem.images[0] != null && this.shopItem.images[0].trim().length != 0 && this.shopItem.images[0] != "https:null" ?
    this.shopItem.images[0] : this.shop.imageUrl
  }

}
