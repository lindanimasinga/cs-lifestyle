import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurrentLocation } from '../model/current-location';
import { Order } from '../model/order';
import { Promotion } from '../model/promotion';
import { StoreProfile } from '../model/storeProfile';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  stores: StoreProfile[] = []
  storesClosed: StoreProfile[] = []
  promotions: Promotion[] = []
  currentOrders: Order[]
  tags = new Set<string>()
  address: string
  
  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private izingaService: IzingaOrderManagementService, private storage: StorageService) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe(queryParamMap => {
    var lat: number = queryParamMap['lat']
    var long: number = queryParamMap['long']
    this.address = queryParamMap['address'] 
    this.storage.currentLocation = new CurrentLocation(lat, long, this.address)
    this.storage.shop = null
    this.izingaService.getAllStoresNamesAndLogos(lat, long, environment.range)
        .subscribe(resp => {
          this.stores = resp.filter(store => !store.storeOffline)
          this.storesClosed = resp.filter(store => store.storeOffline)
          resp.forEach(item => item.tags?.forEach(tag => this.tags.add(tag)))
        })
    
    this.izingaService.getAllPromotions(lat, long, environment.range)
        .subscribe(resp => {
          this.promotions = resp
        })
    })

    this.fetchOrders()
    interval(10000).subscribe(() =>this.fetchOrders())
  }


  fetchOrders () {
    var userId = this.storage.userProfile?.id
    this.izingaService.getAllOrdersByCustomer(userId)
        .pipe(
          map(orders => orders
            .filter(
              store => store.stage != Order.StageEnum._7ALLPAID && store.stage != Order.StageEnum._CANCELLED
              )
            )
          )
        .subscribe(resp => this.currentOrders = resp)
  }
  

  changeAddress() {
    this.storage.currentLocation = null
    this.router.navigate(['/'])
  }

  hasOrders() {
    return this.currentOrders != null && this.currentOrders.length > 0
  }

  statusColor(index: number) {
    return Order.stageColors[index % Order.stageColors.length];
  }

}
