import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';

@Component({
  selector: 'app-izinga-home',
  templateUrl: './izinga-home.component.html',
  styleUrls: ['./izinga-home.component.css']
})
export class IzingaHomeComponent implements OnInit {

  _lat: number = 0
  _long: number = 0
  _address

  constructor(private router: Router, private storage: StorageService) { }

  ngOnInit(): void {
    if(this.storage.currentLocation != null) {
      this.lat = this.storage.currentLocation.lat
      this.long = this.storage.currentLocation.long
      this.address = this.storage.currentLocation.address
      this.findStores()
    }
  }

  set address(address: string) {
    this._address = address;
  }

  get address() {
    return this._address;
  } 

  set lat(lat: number) {
    this._lat = lat;
    console.log(`new lat is ${lat}`)
  }

  get lat() {
    return this._lat;
  }

  set long(long: number) {
    this._long = long;
    console.log(`new long is ${long}`)
  }

  get long() {
    return this._long;
  }

  findStores() {
    this.router.navigate(['stores'], { queryParams: {"lat": this.lat, "long": this.long, "address": this.address} })
  }

}
