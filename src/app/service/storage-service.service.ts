import { Injectable } from '@angular/core';
import { BasketItem, Basket, Order, UserProfile } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  order: Order;
  basket: Basket = {
    items : []
  }
  
  jwt: string;
  userProfile: UserProfile;
  ukhesheUser: import("/Users/lindanimasinga/gitRepos/curiousoft2/cs-clothing/cs-clothing-web/src/app/model/ukheshe-user").UkhesheUser;
  
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
