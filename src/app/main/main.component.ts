import { Component, HostListener, OnInit } from '@angular/core';
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

  shortName?: string;

  constructor(private storageService: StorageService,
    private izingaService: IzingaOrderManagementService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.storageService.shop == null) {
      this.shortName =  this.activatedRoute.snapshot.paramMap.get('shortname')
      if(this.shortName == null) {
        var url = window.location.origin
        var urlParts = url.split("\\")
        this.shortName = urlParts.length > 1 ? urlParts[1] : urlParts[0]
        console.log(`url parts is ${urlParts}`)
      }
      console.log(`path is ${window.location.pathname}`)
      console.log("shortname is " + this.shortName)
      this.izingaService.getStoreById(this.shortName)
      .subscribe(shop => {
        this.storageService.shop = shop;
      })
    }

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
    return this.storageService.userProfile != null && this.storageService.phoneVerified
  }

  get cartNumberOfItems() { 
    return this.storageService.basket != null? this.storageService.basket.items?.length : 0;
  }

  get shoppingListNumberOfItems() { 
    return this.storageService.shoppingList != null? this.storageService.shoppingList.items?.length : 0;
  }

  logout() {
    this.storageService.logout()
    console.log("logged out")
    window.location.href = '/'
  }

  isVisible = false; // Controls the visibility of the div
  lastScrollTop = 0; // Tracks the last scroll position

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > this.lastScrollTop) {
      this.isVisible = true;
    } else if (currentScrollTop < this.lastScrollTop) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }

    const supportedPaths = this.supportedPaths.includes(window.location.pathname);
    this.isVisible = this.isVisible && supportedPaths
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Avoid negative values
  }

  //return a list on supported url paths
  get supportedPaths(): string[] {
    var path = window.location.pathname.startsWith(`/${this.shortName}/item`) ?  window.location.pathname :  null;
    return ['/stores', `/${this.shortName}`, path];
  }

}
