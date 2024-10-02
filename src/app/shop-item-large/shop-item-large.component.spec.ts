import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShopItemLargeComponent } from './shop-item-large.component';

describe('ShopItemComponent', () => {
  let component: ShopItemLargeComponent;
  let fixture: ComponentFixture<ShopItemLargeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopItemLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopItemLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
