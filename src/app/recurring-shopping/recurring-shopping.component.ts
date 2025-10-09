import { Component } from '@angular/core';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import { UserProfile } from '../model/userProfile';
import { ShoppingList } from '../model/shopping-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recurring-shopping',
  templateUrl: './recurring-shopping.component.html',
  styleUrls: ['./recurring-shopping.component.css']
})
export class RecurringShoppingComponent {

  userProfile: UserProfile
  shoppingList: ShoppingList;

  constructor(private router : Router, private izingaService: IzingaOrderManagementService, private storageService: StorageService) {

  }

  ngOnInit(): void {
    this.userProfile = this.storageService.userProfile
    console.log(`user is ${this.userProfile}`)
    if(this.userProfile == null) {
      this.router.navigate(['login'])
      return
    }

    if(this.storageService.shoppingList && this.storageService.shoppingList.items.length > 0) {
      this.router.navigate(['../recurring-form'])
      return
    }

    this.izingaService.findShoppingLists(this.userProfile.id).subscribe(respo => this.shoppingList = respo)
  }

}
