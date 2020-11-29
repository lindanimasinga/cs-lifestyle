import { Component, OnInit } from '@angular/core';
import { ShopItem } from '../model/shop-item';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StoreProfile, Stock } from '../model/models';
import { environment } from 'src/environments/environment';

declare var Flickity: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images: Array<String>
  store: StoreProfile;
  shopItems: Stock[];
  
  constructor(private storageService: StorageService, 
    private izingaService: IzingaOrderManagementService) {

  }

  ngOnInit() {

    this.izingaService.getStoreById(environment.storeId)
    .subscribe(store => {
      this.store = store
      this.storageService.shop = this.store
      this.shopItems = store.stockList;
    })

    this.images = [
        "https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/celeste-m.jpg",
        "https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/jumpsuite-black-1.jpg",
        "http://demo.minimalthemes.net/opamo/assets/images/header-03.jpg",
        "http://demo.minimalthemes.net/opamo/assets/images/header-02.jpg",
        "http://demo.minimalthemes.net/opamo/assets/images/header-04.jpg"];
  }

  ngAfterViewInit() {
    var elem = document.querySelector('.carousel');
    new Flickity(elem,{
      // options
      autoPlay: 10000,
      "imagesLoaded": true,
      "percentPosition": false
    })
  }

}
