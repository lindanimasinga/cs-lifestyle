import { Injectable } from '@angular/core';
import { BasketItem, Basket, Order, UserProfile } from '../model/models';
import { UkhesheUser } from '../model/ukheshe-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  order: Order //= {"basket":{"items":[{"name":"Skirt","price":499,"discountPerc":0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"30","price":0},{"name":"Colours","values":["White","Blue","Black","Yellow"],"selected":"White","price":0}],"quantity":1,"image":"https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"},{"name":"Skirt","price":499,"discountPerc":0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"30","price":0},{"name":"Colours","values":["White","Blue","Black","Yellow"],"selected":"White","price":0}],"quantity":1,"image":"https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"},{"name":"Skirt","price":499,"discountPerc":0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"30","price":0},{"name":"Colours","values":["White","Blue","Black","Yellow"],"selected":"White","price":0}],"quantity":1,"image":"https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"}]},"customerId":"ffd4c856-644f-4453-a5ed-84689801a747","shopId":"d4bf58f4-44eb-4402-8ee9-b457c263833e","orderType":"ONLINE","stage":"STAGE_0_CUSTOMER_NOT_PAID","description":"CS order 0812815707","shippingData":{"fromAddress":"45 CS lifestyle street","toAddress":"41 Sheffield Cl, Milnerton Rural, Cape Town, 7441, South Africa","messengerId":"ffd4c856-644f-4453-a5ed-84689801a747","buildingType":"HOUSE","type":"DELIVERY","additionalInstructions":"call me at 10111"}};
  basket: Basket = {
    items : []
  }
  
  jwt: string;
  userProfile: UserProfile //= {"id":"ffd4c856-644f-4453-a5ed-84689801a747","name":"Lindani","description":"customer","yearsInService":0,"address":"41 Sheffield Cl, Milnerton Rural, Cape Town, 7441, South Africa","imageUrl":"https://pbs.twimg.com/media/C1OKE9QXgAAArDp.jpg","likes":0,"servicesCompleted":0,"badges":0,"mobileNumber":"0812815707","emailAddress":null,"role":"STORE_ADMIN","responseTimeMinutes":0,"verificationCode":null,"bank":{"name":"Ukheshe","phone":"0812815707","accountId":null,"type":"wallet"},"latitude":0.0,"longitude":0.0,"idNumber":""};
  ukhesheUser: UkhesheUser;
  
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
