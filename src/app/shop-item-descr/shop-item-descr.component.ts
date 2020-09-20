import { Component, OnInit, Input } from '@angular/core';
import { ShopItem } from '../model/shop-item';
import { Stock } from '../model/stock';
import { ActivatedRoute } from '@angular/router';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../service/storage-service.service';
import { BasketItem } from '../model/models';

@Component({
  selector: 'app-shop-item-descr',
  templateUrl: './shop-item-descr.component.html',
  styleUrls: ['./shop-item-descr.component.css']
})
export class ShopItemDescrComponent implements OnInit {

  @Input()
  shopItem: Stock;
  basketItem: BasketItem;
  optionSelected: string;
  quantity: number = 1;

  constructor(private route: ActivatedRoute, 
    private izingaService: IzingaOrderManagementService,
    private storageService: StorageService) { }

  ngOnInit() {
    const stockId = this.route.snapshot.paramMap.get('id');
    this.izingaService.getStoreById(environment.storeId)
      .subscribe(store => this.shopItem = store.stockList.find(item => item.id == stockId))
  }

  addToCart() {
    this.basketItem = {
      name: this.shopItem.name,
      price: this.shopItem.price,
      discountPerc: this.shopItem.discountPerc,
      options: this.shopItem.mandatorySelection,
      quantity: this.quantity,
      image: this.shopItem.images[0]
    }
    this.storageService.addToCart(this.basketItem);
  }

}
