import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreProfile } from '../model/storeProfile';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  stores: StoreProfile[] = []
  
  constructor(private activeRoute: ActivatedRoute, private izingaService: IzingaOrderManagementService) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe(queryParamMap => {
    var lat: number = queryParamMap['lat']
    var long: number = queryParamMap['long']

    this.izingaService.getAllStores(lat, long, 0.1)
        .subscribe(resp => this.stores = resp)
    })
  }

}
