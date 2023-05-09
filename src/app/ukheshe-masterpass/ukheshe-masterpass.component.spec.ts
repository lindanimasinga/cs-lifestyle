import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UkhesheMasterpassComponent } from './ukheshe-masterpass.component';

describe('UkhesheMasterpassComponent', () => {
  let component: UkhesheMasterpassComponent;
  let fixture: ComponentFixture<UkhesheMasterpassComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UkhesheMasterpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkhesheMasterpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
