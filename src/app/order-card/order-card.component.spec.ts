import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderCardComponent } from './order-card.component';

describe('OrderCardComponent', () => {
  let component: OrderCardComponent;
  let fixture: ComponentFixture<OrderCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
