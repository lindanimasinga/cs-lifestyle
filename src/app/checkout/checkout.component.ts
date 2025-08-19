import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage-service.service';
import { Basket } from '../model/basket';
import { BasketItem } from '../model/models';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {

  }

  get basket(): Basket  {
    return this.storageService.basket;
   /* return {
      items: [
        {
          name : "test",
          price : 499,
          image : "https://scontent-jnb1-1.cdninstagram.com/v/t51.2885-15/e35/118599353_111634840565910_3170884662795542417_n.jpg?_nc_ht=scontent-jnb1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=XKFLXwLufkkAX-u2ATA&oh=ea5ffbeb3909c5c11a83792667d0b448&oe=5F7FAFE9",
          quantity : 2,
          options : [
            {
              name : "Color",
              selected : "Red"
            },
            {
              name: "Size",
              selected: "32"
            }
          ]
        },
        {
          name : "test",
          price : 499,
          image : "https://scontent-jnb1-1.cdninstagram.com/v/t51.2885-15/e35/118599353_111634840565910_3170884662795542417_n.jpg?_nc_ht=scontent-jnb1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=XKFLXwLufkkAX-u2ATA&oh=ea5ffbeb3909c5c11a83792667d0b448&oe=5F7FAFE9",
          quantity : 2,
          options : [
            {
              name : "Color",
              selected : "Red"
            },
            {
              name: "Size",
              selected: "32"
            }
          ]
        },
        {
          name : "test",
          price : 499,
          image : "https://scontent-jnb1-1.cdninstagram.com/v/t51.2885-15/e35/118599353_111634840565910_3170884662795542417_n.jpg?_nc_ht=scontent-jnb1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=XKFLXwLufkkAX-u2ATA&oh=ea5ffbeb3909c5c11a83792667d0b448&oe=5F7FAFE9",
          quantity : 2,
          options : [
            {
              name : "Color",
              selected : "Red"
            },
            {
              name: "Size",
              selected: "32"
            }
          ]
        }
      ]
    }*/
  
  }

  remove(item: BasketItem) {
    this.storageService.removeFromCart(item.name)
  }

  loggedId() {
    return this.storageService.userProfile != null && this.storageService.phoneVerified
  }

  totalPrice(): number {
    return this.basket.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  totalItems(): number {
    return this.basket.items.reduce((total, item) => total + item.quantity, 0);
  }

}
