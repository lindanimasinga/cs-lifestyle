import { Component, OnInit, Input } from '@angular/core';
import { ShopItem } from '../model/shop-item';
import { Stock } from '../model/stock';
import { ActivatedRoute } from '@angular/router';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../service/storage-service.service';
import { BasketItem, StoreProfile } from '../model/models';
import { ShoppingList } from '../model/shopping-list';

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
  imageSelected: string;
  store: StoreProfile;
  shoppingList: ShoppingList = {
    items: []
  };

  constructor(private route: ActivatedRoute,
    private izingaService: IzingaOrderManagementService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param["id"]) {
        const stockId = this.route.snapshot.paramMap.get('id');
        this.store = this.storageService.shop
        this.shopItem = this.store.stockList.find(item => item.id == stockId)
        this.imageSelected = this.shopItem.images ? this.shopItem.images[0] : undefined
        this.quantity = 1;

        if (!this.storageService.shoppingList) {
          this.storageService.shoppingList = this.shoppingList;
        } else {
          this.shoppingList = this.storageService.shoppingList;
        }
        this.shoppingList.shopId = this.store.id
      }
    });
  }

  addToCart() {
    if(!this.hasStock) {
      this.storageService.errorMessage = "Sorry. Stock not available for this product."
      return
    }

    this.basketItem = {
      name: this.shopItem.name,
      price: this.shopItem.price * this.quantity,
      discountPerc: this.shopItem.discountPerc,
      options: this.shopItem.mandatorySelection,
      quantity: this.quantity,
      image: this.shopItem.images ? this.shopItem.images[0] : undefined
    }
    this.storageService.addToCart(this.basketItem);
  }

  addToShoppingList() {
    if(!this.hasStock) {
      this.storageService.errorMessage = "Sorry. Stock not available for this product."
      return
    } 

    if (this.shoppingList.shopId != this.store.id) {
      this.storageService.shoppingList = {
        items: [],
        shopId: this.store.id,
        name: this.store.name
      };
      this.shoppingList = this.storageService.shoppingList
    }

    this.shoppingList.items.push({
      name: this.shopItem.name,
      price: this.shopItem.price * this.quantity,
      quantity: this.quantity,
      imageUrl: this.shopItem.images ? this.shopItem.images[0] : undefined,
      shopId: this.store.id,
      shopName: this.store.name
    });
    this.storageService.shoppingList = this.shoppingList;
    console.log("Added item to Shopping List: ", this.shopItem.name)
  }

  hasValidSeletion(): boolean {
    return this.shopItem?.mandatorySelection.find((item1) => item1.selected == null) == null;
  }

  get hasStock(): boolean {
    return this.shopItem.quantity > 0
  }

  hasItemsInCart(): boolean {
    return this.storageService.basket != null && 
      this.storageService.basket.storeName == this.store?.name &&
      this.storageService.basket.items.length > 0;
  }

  get cartNumberOfItems() { 
    return this.storageService.basket != null? this.storageService.basket.items?.length : 0;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    if (this.quantity < 100) {
      this.quantity++;
    }
  }

}
