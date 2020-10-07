import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemHistoryComponent } from './order-item-history.component';

describe('OrderItemHistoryComponent', () => {
  let component: OrderItemHistoryComponent;
  let fixture: ComponentFixture<OrderItemHistoryComponent>;

  beforeEach(async(() => {
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
