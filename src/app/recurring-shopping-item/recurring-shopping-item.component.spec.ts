import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringShoppingItemComponent } from './recurring-shopping-item.component';

describe('RecurringShoppingItemComponent', () => {
  let component: RecurringShoppingItemComponent;
  let fixture: ComponentFixture<RecurringShoppingItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringShoppingItemComponent]
    });
    fixture = TestBed.createComponent(RecurringShoppingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
