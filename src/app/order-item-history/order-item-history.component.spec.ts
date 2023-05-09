import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderItemHistoryComponent } from './order-item-history.component';

describe('OrderItemHistoryComponent', () => {
  let component: OrderItemHistoryComponent;
  let fixture: ComponentFixture<OrderItemHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
