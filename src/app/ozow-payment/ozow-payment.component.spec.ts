import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OzowPaymentComponent } from './ozow-payment.component';

describe('OzowPaymentComponent', () => {
  let component: OzowPaymentComponent;
  let fixture: ComponentFixture<OzowPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OzowPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OzowPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
