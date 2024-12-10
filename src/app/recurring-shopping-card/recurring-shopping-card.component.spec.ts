import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringShoppingCardComponent } from './recurring-shopping-card.component';

describe('RecurringShoppingCardComponent', () => {
  let component: RecurringShoppingCardComponent;
  let fixture: ComponentFixture<RecurringShoppingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringShoppingCardComponent]
    });
    fixture = TestBed.createComponent(RecurringShoppingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
