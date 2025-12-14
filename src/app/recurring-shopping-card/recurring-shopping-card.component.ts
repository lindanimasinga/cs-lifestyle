import { Component, Input } from '@angular/core';
import { ShoppingList } from '../model/shopping-list';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';

@Component({
  selector: 'app-recurring-shopping-card',
  templateUrl: './recurring-shopping-card.component.html',
  styleUrls: ['./recurring-shopping-card.component.css']
})
export class RecurringShoppingCardComponent {

  @Input()
  list: ShoppingList

  constructor(private shoppingListService: IzingaOrderManagementService) { }

  deleteList(listId: string) {
    this.shoppingListService.deleteShoppingList(listId).subscribe(() => {
      console.log("Deleted recurring shopping list with ID: ", listId);
      //reload the page to reflect changes
      window.location.reload();
    });
  }

}
