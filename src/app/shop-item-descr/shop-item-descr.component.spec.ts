import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemDescrComponent } from './shop-item-descr.component';

describe('ShopItemDescrComponent', () => {
  let component: ShopItemDescrComponent;
  let fixture: ComponentFixture<ShopItemDescrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopItemDescrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopItemDescrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
