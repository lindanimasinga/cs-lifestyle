import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringShoppingComponent } from './recurring-shopping.component';

describe('RecurringShoppingComponent', () => {
  let component: RecurringShoppingComponent;
  let fixture: ComponentFixture<RecurringShoppingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringShoppingComponent]
    });
    fixture = TestBed.createComponent(RecurringShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
