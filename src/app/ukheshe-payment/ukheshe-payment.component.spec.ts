import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkheshePaymentComponent } from './ukheshe-payment.component';

describe('UkheshePaymentComponent', () => {
  let component: UkheshePaymentComponent;
  let fixture: ComponentFixture<UkheshePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkheshePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkheshePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
