import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PromoSliderComponent } from './promo-slider.component';

describe('PromoSliderComponent', () => {
  let component: PromoSliderComponent;
  let fixture: ComponentFixture<PromoSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
