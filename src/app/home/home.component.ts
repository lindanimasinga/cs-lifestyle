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
        "https://scontent-jnb1-1.xx.fbcdn.net/v/t1.0-9/119056896_147821566975668_1658580827841461240_o.jpg?_nc_cat=106&_nc_sid=e3f864&_nc_ohc=U78mvCDNvYQAX_ZEiKp&_nc_ht=scontent-jnb1-1.xx&oh=84638c5634326582fd9296cac40e7c56&oe=5F9D6802",
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
