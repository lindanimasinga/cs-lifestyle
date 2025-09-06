import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { ShoppingItem, ShoppingList } from '../model/shopping-list';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../service/storage-service.service';
import { debounceTime, distinctUntilChanged, flatMap, map, switchMap, tap } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { StoreProfile } from '../model/storeProfile';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recurring-shopping-form',
  templateUrl: './recurring-shopping-form.component.html',
  styleUrls: ['./recurring-shopping-form.component.css']
})
export class RecurringShoppingFormComponent implements OnInit {
  
  isSearching = false
  showSearches = false
  shops: StoreProfile[] = [];
  shoppingList: ShoppingList = {
    items: []
  };
  userIds = ""
  _newShoppingItem: string
  allStockAvailable: Array<DropDownSelectableStock>
  filteredStock: Array<DropDownSelectableStock>
  lastAddedItemId: string | undefined;
  quantity = 1;

  constructor(private izingaService: IzingaOrderManagementService, 
    private router: Router, 
    private storageService: StorageService, 
    private activateRoute: ActivatedRoute, 
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(param => {
      var shoppingId = param["id"]
      if (shoppingId) {
        this.izingaService.findShoppingList(shoppingId)
        .subscribe(shoppingList => {
          this.shoppingList = shoppingList
          this.shopId = shoppingList.shopId
        })
      } else {
        this.shoppingList = this.storageService.shoppingList || { items: [] }
        this.shopId = this.shoppingList.shopId
      }
    })

    this.userIds = this.storageService.userProfile.id
    var latitude = this.storageService.currentLocation.lat
    var longitude = this.storageService.currentLocation.long
    var range = 0.1
    this.izingaService.getAllStores(latitude, longitude, range)
          .subscribe(resp => {
            this.shops = resp
            .filter(store => (store.id == this.shoppingList.shopId || this.shoppingList.shopId == null))
            this.shopId = this.shoppingList.shopId
          })
  }

  get startDate() {
    return this.datePipe.transform(this.shoppingList.startDate, "yyy-MM-dd")
  }

  set startDate(date: string) {
    this.shoppingList.startDate = new Date(date)
  }

  get endDate() {
    return this.datePipe.transform(this.shoppingList.endDate, "yyy-MM-dd")
  }

  set endDate(date: string) {
    this.shoppingList.endDate = new Date(date)
  }

  get newShoppingItem() {
    return this._newShoppingItem;
  }

  set newShoppingItem(newShoppingItem : string) {
    this._newShoppingItem = newShoppingItem
    this.isSearching = true
    this.showSearches = this._newShoppingItem != null && this._newShoppingItem.length > 0 ? true : false
    this.filteredStock = this.filterStock(this._newShoppingItem)
  }

  get shopId() {
    return this.shoppingList.shopId;
  }

  set shopId(shopId : string) {
    if (shopId == null) {
      return
    }
    this.shoppingList.shopId = shopId
    console.log(`setting shop id to ${shopId}`)
    this.shops = this.shops.filter(shop => !shop || shop.id == shopId)
    this.allStockAvailable = this.shops
    .filter(shop => !shop || shop.id == shopId)[0]
    .stockList.map(stk => {
            return {
              name: stk.name,
              imageUrl: stk.images?.[0],
              storeId: "",
              price: stk.price
            } as DropDownSelectableStock
          })
  }


  onSubmit() {
    this.shoppingList.userIds = this.userIds.split(",")
    this.izingaService.createShoppingList(this.shoppingList).subscribe(respo => {
      this.router.navigate(['../recurring'])
      this.storageService.clearShoppingList()
    })
  }

  filterStock(filter: string) : Array<DropDownSelectableStock> {
    console.log(`filtering stock with filter ${this.shoppingList.shopId}`)
    return filter == null ? [] : this.allStockAvailable
    .filter(stock => stock.name.toLowerCase().includes(filter.toLowerCase()))
  }

  selectedStock(stockSelected: DropDownSelectableStock) {
    console.log(`adding item to shopping list ${stockSelected.name}`)
    this.shoppingList.items.push( {
      name: stockSelected.name,
      shopId: stockSelected.storeId,
      imageUrl: stockSelected.imageUrl,
      quantity: 1,
      price: stockSelected.price,
      shopName: stockSelected.storeId
    })
    this.newShoppingItem = null
  }

  addShoppingItem(item: any) {
    // ...your logic to add item...
    this.lastAddedItemId = item.id; // or whatever unique identifier you use
    setTimeout(() => this.lastAddedItemId = undefined, 2000); // Remove highlight after 2s
  }

  increaseQuantity(i: number) {
    console.log(`increasing quantity of item ${this.shoppingList.items[i].name} to ${this.shoppingList.items[i].quantity}`)
    if (this.shoppingList.items[i].quantity < 100) {
      this.shoppingList.items[i].quantity += 1
    }
    this.quantity += 1
  }

  decreaseQuantity(i: number) {
    console.log(`decreasing quantity of item ${this.shoppingList.items[i].name} to ${this.shoppingList.items[i].quantity}`)
    if (this.shoppingList.items[i].quantity > 1) {
      this.shoppingList.items[i].quantity -= 1
    } else {
      this.shoppingList.items.splice(i, 1);
    }
    this.quantity -= 1
  }

  trackByQuantity(index: number, item: ShoppingItem): string {
    return item.name + item.quantity;
  }

  checkout() {
    console.log(`checking out shopping list ${this.shoppingList.name}`)
    this.storageService.clearOrder()
    this.storageService.basket = {
      storeName: this.shops.find(shop => shop.id == this.shoppingList.shopId)?.name,
      items: this.shoppingList.items.map(item => {
        return {
          name: item.name,
          price: 100, // Default price, can be updated later
          quantity: item.quantity,
          image: item.imageUrl,
          options: []
        }
      })
    }
    this.storageService.basket.storeId = this.shoppingList.shopId
    this.storageService.shop = this.shops[0];
    this.router.navigate(['/cart']);
  }

  get isVisible() {
    const today = new Date();
    const runDate = new Date(this.shoppingList.nextRunDate);
    return this.shoppingList.nextRunDate &&
      today.getFullYear() === runDate.getFullYear() &&
      today.getMonth() === runDate.getMonth() &&
      today.getDate() === runDate.getDate();
  }

}

export class DropDownSelectableStock {
  name: string
  imageUrl: string
  storeId: string
  price: number
}
