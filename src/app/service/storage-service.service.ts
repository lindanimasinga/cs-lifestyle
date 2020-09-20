import { Injectable } from '@angular/core';
import { BasketItem, Basket, Order } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  order: Order;
  basket: Basket = {
    items : []
  }
  
  addToCart(basketItem: BasketItem) {
    this.basket.items.push(basketItem)
  }

  removeFromCart(name: String) {
    var index = this.basket.items.findIndex(item => item.name == name)
    if (index > -1) {
      this.basket.items.splice(index, 1);
   }
  }

  constructor() { }
}
