import { Component, OnInit, Input } from '@angular/core';
import { ShopItem } from '../model/shop-item';
import { Stock } from '../model/stock';

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
  shopId: String

  constructor() { }

  ngOnInit(): void {
  }

}
