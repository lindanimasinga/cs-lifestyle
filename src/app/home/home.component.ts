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

  images = ["https://instagram.fjnb6-1.fna.fbcdn.net/v/t51.2885-15/e35/116887406_618640769085639_6588627008028559447_n.jpg?_nc_ht=instagram.fjnb6-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=nXrPrbRxW-8AX-zaoZG&oh=309211494edeed1efc0751421ed21275&oe=5F56B2D6",
    "https://instagram.fcpt7-1.fna.fbcdn.net/v/t51.2885-15/e35/117301761_629230881051602_1316649096769295735_n.jpg?_nc_ht=instagram.fcpt7-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=25hz-8510rQAX-JiJJA&oh=7e664fb6bfe93c01aef639bcb23d4ef0&oe=5F685138",
    "https://instagram.fjnb6-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/117318284_365045954491609_6460399161906484730_n.jpg?_nc_ht=instagram.fjnb6-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=1D54FqB5JcUAX_l9AGb&oh=ddeebb725d312f9d302b7b73bbe742e8&oe=5F59D930"]
  
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
      "https://instagram.fjnb6-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/117295048_1592663290923803_3514136698291763307_n.jpg?_nc_ht=instagram.fjnb6-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=mfolQ2CiDrcAX_WWtvm&oh=a8d3a0e34a3af06eaad935b5a78d42c3&oe=5F5A6F66",
      "https://instagram.fcpt7-1.fna.fbcdn.net/v/t51.2885-15/e35/117301761_629230881051602_1316649096769295735_n.jpg?_nc_ht=instagram.fcpt7-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=25hz-8510rQAX-JiJJA&oh=7e664fb6bfe93c01aef639bcb23d4ef0&oe=5F685138"]
      : ["http://demo.minimalthemes.net/opamo/assets/images/header-03.jpg",
        "http://demo.minimalthemes.net/opamo/assets/images/header-02.jpg",
        "http://demo.minimalthemes.net/opamo/assets/images/header-04.jpg"];
  }

}
