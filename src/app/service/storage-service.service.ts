import { Injectable } from '@angular/core';
import { BasketItem, Basket, Order, UserProfile, StoreProfile, CurrentLocation } from '../model/models';
import { UkhesheUser } from '../model/ukheshe-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  USER_PROFILE_KEY = "sdfwefdsfsd";
  BASKET_KEY = "sdfsdfljsdf";
  ORDER_KEY = "fuiwerfbsk";
  CUURENT_LOCATION_KEY = "kfjhdyrbvsl"
  TOKEN_KEY = "vm1xcnvfoiwerw"
  jwt: string;
  ukhesheUser: UkhesheUser;
  shop: StoreProfile;
  orders: Array<Order>;
  cache: Storage = window.localStorage
  _order: Order // = {"basket":{"items":[{"name":"Skirt","price":499,"discountPerc":0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"30","price":0},{"name":"Colours","values":["White","Blue","Black","Yellow"],"selected":"White","price":0}],"quantity":1,"image":"https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"},{"name":"Skirt","price":499,"discountPerc":0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"30","price":0},{"name":"Colours","values":["White","Blue","Black","Yellow"],"selected":"White","price":0}],"quantity":1,"image":"https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"},{"name":"Skirt","price":499,"discountPerc":0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"30","price":0},{"name":"Colours","values":["White","Blue","Black","Yellow"],"selected":"White","price":0}],"quantity":1,"image":"https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"}]},"customerId":"ffd4c856-644f-4453-a5ed-84689801a747","shopId":"d4bf58f4-44eb-4402-8ee9-b457c263833e","orderType":"ONLINE","stage":"STAGE_0_CUSTOMER_NOT_PAID","description":"CS order 0812815707","shippingData":{"fromAddress":"45 CS lifestyle street","toAddress":"41 Sheffield Cl, Milnerton Rural, Cape Town, 7441, South Africa","messengerId":"ffd4c856-644f-4453-a5ed-84689801a747","buildingType":"HOUSE","type":"DELIVERY","additionalInstructions":"call me at 10111"}};
  _basket: Basket
  _userProfile: UserProfile //= {"id":"ffd4c856-644f-4453-a5ed-84689801a747","name":"Lindani","description":"customer","yearsInService":0,"address":"41 Sheffield Cl, Milnerton Rural, Cape Town, 7441, South Africa","imageUrl":"https://pbs.twimg.com/media/C1OKE9QXgAAArDp.jpg","likes":0,"servicesCompleted":0,"badges":0,"mobileNumber":"0812815707","emailAddress":null,"role":"STORE_ADMIN","responseTimeMinutes":0,"verificationCode":null,"bank":{"name":"Ukheshe","phone":"0812815707","accountId":null,"type":"wallet"},"latitude":0.0,"longitude":0.0,"idNumber":""};
  _currentLocation: CurrentLocation
  errorMessage: String;
  _fcmToken: string

  constructor() { }

  get userProfile() {
    if(this._userProfile == null) {
      this._userProfile = JSON.parse(this.cache.getItem(this.USER_PROFILE_KEY))
    }
    return this._userProfile;
  }

  set userProfile(userProfile: UserProfile) {
    this._userProfile = userProfile
    this.cache.setItem(this.USER_PROFILE_KEY, JSON.stringify(this._userProfile))
  }

  get basket() {
    if(this._basket == null) {
      this._basket = JSON.parse(this.cache.getItem(this.BASKET_KEY))
    }
    return this._basket;
  }

  set basket(basket: Basket) {
    this._basket = basket
    if(basket == null) {
      this.cache.removeItem(this.BASKET_KEY)
      return
    }
    this.cache.setItem(this.BASKET_KEY, JSON.stringify(this._basket))
  }

  set order(order: Order) {
    this._order = order
    if(order == null) {
      this.cache.removeItem(this.ORDER_KEY)
      return
    }
    this.cache.setItem(this.ORDER_KEY, JSON.stringify(this._order))
  }

  get order() {
    if(this._order == null) {
      this._order = JSON.parse(this.cache.getItem(this.ORDER_KEY))
    }
    return this._order;
  }

  set fcmToken(token: string) {
    this._fcmToken = token
    if(token == null) {
      this.cache.removeItem(this.TOKEN_KEY)
      return
    }
    this.cache.setItem(this.TOKEN_KEY, this._fcmToken)
  }

  get fcmToken() {
    if(this._fcmToken == null) {
      this._fcmToken = this.cache.getItem(this.TOKEN_KEY)
    }
    return this._fcmToken;
  }
  
  addToCart(basketItem: BasketItem) {
    if(this.basket == null) {
      this.basket = {
        storeName: this.shop.name,
        storeId: this.shop.id,
        items: []
      }
    }
    this.basket.items.push(basketItem)
    this.basket = this.basket
  }

  get currentLocation() {
    if(this._currentLocation == null) {
      this._currentLocation = JSON.parse(this.cache.getItem(this.CUURENT_LOCATION_KEY))
    }
    return this._currentLocation;
  }

  set currentLocation(currectLocation: CurrentLocation) {
    this._currentLocation = currectLocation
    if(currectLocation == null) {
      this.cache.removeItem(this.CUURENT_LOCATION_KEY)
      return
    }
    this.cache.setItem(this.CUURENT_LOCATION_KEY, JSON.stringify(this._currentLocation))
  }

  removeFromCart(name: String) {
    var index = this.basket.items.findIndex(item => item.name == name)
    if (index > -1) {
      this.basket.items.splice(index, 1);
   }
   this.basket = this.basket
  }

  clearOrder() {
    this.basket = null
    this.order = null
  }

  logout() {
    this.cache.clear()
  }

}
