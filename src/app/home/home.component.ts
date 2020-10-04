import { Component, OnInit } from '@angular/core';
import { ShopItem } from '../model/shop-item';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StoreProfile, Stock } from '../model/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [
    "https://scontent-jnb1-1.xx.fbcdn.net/v/t1.0-9/119056896_147821566975668_1658580827841461240_o.jpg?_nc_cat=106&_nc_sid=e3f864&_nc_ohc=U78mvCDNvYQAX_ZEiKp&_nc_ht=scontent-jnb1-1.xx&oh=84638c5634326582fd9296cac40e7c56&oe=5F9D6802",
    "https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/richardquinndebenhams.jpg",
    "https://instagram.fcpt7-1.fna.fbcdn.net/v/t51.2885-15/e35/117301761_629230881051602_1316649096769295735_n.jpg?_nc_ht=instagram.fcpt7-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=25hz-8510rQAX-JiJJA&oh=7e664fb6bfe93c01aef639bcb23d4ef0&oe=5F685138",
    "https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"]
  
  store: StoreProfile;
  shopItems: Stock[];

  
  
  constructor(private storageService: StorageService, 
    private izingaService: IzingaOrderManagementService) {

  }

  ngOnInit() {

    this.izingaService.getStoreById(environment.storeId)
    .subscribe(store => {
      this.store = store
      this.shopItems = store.stockList;
    })

    this.images = window.screen.width < window.screen.height ? ["https://scontent-jnb1-1.cdninstagram.com/v/t51.2885-15/e35/s480x480/117721197_220955205980141_4208168142925396522_n.jpg?_nc_ht=scontent-jnb1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=Ac-XJznp95QAX9NuoTo&oh=d3752113e59292e0c34e466f1269043c&oe=5F819B8E",
      "https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/richardquinndebenhams.jpg",
      "https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"]
      : [
        "https://scontent-jnb1-1.xx.fbcdn.net/v/t1.0-9/119056896_147821566975668_1658580827841461240_o.jpg?_nc_cat=106&_nc_sid=e3f864&_nc_ohc=U78mvCDNvYQAX_ZEiKp&_nc_ht=scontent-jnb1-1.xx&oh=84638c5634326582fd9296cac40e7c56&oe=5F9D6802",
        "http://demo.minimalthemes.net/opamo/assets/images/header-03.jpg",
        "http://demo.minimalthemes.net/opamo/assets/images/header-02.jpg",
        "http://demo.minimalthemes.net/opamo/assets/images/header-04.jpg"];
  }

}
