import { Component } from '@angular/core';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { ShoppingList } from '../model/shopping-list';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage-service.service';

@Component({
  selector: 'app-recurring-shopping-form',
  templateUrl: './recurring-shopping-form.component.html',
  styleUrls: ['./recurring-shopping-form.component.css']
})
export class RecurringShoppingFormComponent {

  shoppingList: ShoppingList = {};
  userIds = ""
  newShoppingItem: string

  constructor(private izingaService: IzingaOrderManagementService, private router: Router, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.userIds = this.storageService.userProfile.id
  }

  onSubmit() {
    this.shoppingList.userIds = this.userIds.split(",")
    this.izingaService.createShoppingList(this.shoppingList).subscribe(respo => {
      this.router.navigate(["../"])
    })
  }

}
