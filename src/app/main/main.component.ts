import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreProfile } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import {Utils} from '../utils/utils'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private storageService: StorageService,
    private izingaService: IzingaOrderManagementService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    var shortName =  this.activatedRoute.snapshot.paramMap.get('shortname')
    if(shortName == null) {
      var url = window.location.origin
      var urlParts = url.split("\.")
      shortName = urlParts.length == 3 ? urlParts[1] : urlParts[0]
    }
    console.log("shortname is " + shortName)
    this.izingaService.getStoreById(shortName)
    .subscribe(shop => {
      this.storageService.shop = shop;
    })

    if(this.hasError) {
      this.storageService.errorMessage = null
    }
  }

  get shop() : StoreProfile {
    return this.storageService.shop
  }

  get hasError(): boolean {
    return this.storageService.errorMessage != null 
  }

  clearError() {
    this.storageService.errorMessage = null;
  }

  get errorMessage() {
    return this.storageService.errorMessage
  }

  loggedIn() : boolean {
    return this.storageService.userProfile != null
  }

  get cartNumberOfItems() { 
    return this.storageService.basket != null? this.storageService.basket.items?.length : 0;
  }

  logout() {
    this.storageService.logout()
    console.log("logged out")
    window.location.href = '/'
  }

}
