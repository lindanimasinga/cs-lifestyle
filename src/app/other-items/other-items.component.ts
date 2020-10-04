import { Component, OnInit } from '@angular/core';
import { Stock, StoreProfile } from '../model/models';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-other-items',
  templateUrl: './other-items.component.html',
  styleUrls: ['./other-items.component.css']
})
export class OtherItemsComponent implements OnInit {

  store: StoreProfile;
  shopItems: Stock[];
  
  constructor(private storageService: StorageService, 
    private izingaService: IzingaOrderManagementService) {

      this.izingaService.getStoreById(environment.storeId)
      .subscribe(store => {
        this.store = store
        this.shopItems = store.stockList;
      })

  }

  ngOnInit(): void {
  }

}
