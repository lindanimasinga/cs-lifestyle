import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringShoppingFormComponent } from './recurring-shopping-form.component';

describe('RecurringShoppingFormComponent', () => {
  let component: RecurringShoppingFormComponent;
  let fixture: ComponentFixture<RecurringShoppingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringShoppingFormComponent]
    });
    fixture = TestBed.createComponent(RecurringShoppingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
