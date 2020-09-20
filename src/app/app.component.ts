import { Component } from '@angular/core';
import { ShopItem} from './model/shop-item';
import { StorageService } from './service/storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'cs-clothing-web';

  constructor(private storageService: StorageService) {

  }
  
  hasItemsInCart(): boolean {
    return this.storageService.basket.items.length > 0;
  }

  get cartNumberOfItems() { 
    return this.storageService.basket.items.length;
  }
}
