import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { ShoppingList } from '../model/shopping-list';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../service/storage-service.service';
import { debounceTime, distinctUntilChanged, flatMap, map, switchMap, tap } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recurring-shopping-form',
  templateUrl: './recurring-shopping-form.component.html',
  styleUrls: ['./recurring-shopping-form.component.css']
})
export class RecurringShoppingFormComponent implements OnInit {
  
  isSearching = false
  showSearches = false
  shoppingList: ShoppingList = {
    items: []
  };
  userIds = ""
  _newShoppingItem: string
  allStockAvailable: Array<DropDownSelectableStock>
  filteredStock: Array<DropDownSelectableStock>

  constructor(private izingaService: IzingaOrderManagementService, 
    private router: Router, 
    private storageService: StorageService, 
    private activateRoute: ActivatedRoute, 
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(param => {
      var shoppingId = param["id"]
      this.izingaService.findShoppingList(shoppingId)
      .subscribe(shoppingList => {
        this.shoppingList = shoppingList
      })
    })
    

    this.userIds = this.storageService.userProfile.id
    var latitude = this.storageService.currentLocation.lat
    var longitude = this.storageService.currentLocation.long
    var range = 0.1
    this.izingaService.getAllShopsStock(latitude, longitude, range)
    .subscribe(stock => {
      console.log("received all stock for shops...")
      this.allStockAvailable = stock.map(item => {
        var itemsElements = item.split("#!#")
        var dropD: DropDownSelectableStock = {
          name: itemsElements[0],
          storeId: itemsElements[1],
          imageUrl: itemsElements[2]
        }
        return dropD
      })
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

  onSubmit() {
    this.shoppingList.userIds = this.userIds.split(",")
    this.izingaService.createShoppingList(this.shoppingList).subscribe(respo => {
      document.location.href = document.referrer
    })
  }

  filterStock(filter: string) : Array<DropDownSelectableStock> {
    return filter == null ? [] : this.allStockAvailable.filter(stock => stock.name.toLowerCase().includes(filter.toLowerCase()))
  }

  selectedStock(stockSelected: DropDownSelectableStock) {
    console.log(`adding item to shopping list ${stockSelected.name}`)
    this.shoppingList.items.push( {
      name: stockSelected.name,
      shopId: stockSelected.storeId,
      imageUrl: stockSelected.imageUrl,
      quality: 1,
      priceRange: "100, 200",
      shopName: stockSelected.storeId
    })
    this.newShoppingItem = null
  }

  trackById(index,item):void{
    return item.name;
  }

}

export class DropDownSelectableStock {
  name: string
  imageUrl: string
  storeId: string
}
