import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayfastComponent } from './payfast.component';

describe('PayfastComponent', () => {
  let component: PayfastComponent;
  let fixture: ComponentFixture<PayfastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayfastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayfastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
