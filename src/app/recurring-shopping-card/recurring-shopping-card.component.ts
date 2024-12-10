import { Component, Input } from '@angular/core';
import { ShoppingList } from '../model/shopping-list';

@Component({
  selector: 'app-recurring-shopping-card',
  templateUrl: './recurring-shopping-card.component.html',
  styleUrls: ['./recurring-shopping-card.component.css']
})
export class RecurringShoppingCardComponent {

  @Input()
  list: ShoppingList

}
