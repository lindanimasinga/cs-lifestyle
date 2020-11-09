import { Component } from '@angular/core';
import { ShopItem} from './model/shop-item';
import { StorageService } from './service/storage-service.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'cs-clothing-web';

  constructor(private storageService: StorageService, private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var page: NavigationEnd = event;
        this.configureScrollEffects(page)
      }
    });
  }

  private configureScrollEffects(page: NavigationEnd) {

    setTimeout(() => {
      if (document.getElementsByName("scrollTo")[0]) {
        document.getElementsByName("scrollTo")[0].scrollIntoView();
        window.scrollBy(0, -76)
      }
    }, 1)
  }
  
  hasItemsInCart(): boolean {
    return this.storageService.basket.items.length > 0;
  }

  shouldShowIcon(): boolean {
    return this.router.url == "/" || this.router.url.startsWith("/item/");
  }

  get cartNumberOfItems() { 
    return this.storageService.basket.items.length;
  }
}
