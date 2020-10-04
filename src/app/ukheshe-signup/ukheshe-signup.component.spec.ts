import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkhesheSignupComponent } from './ukheshe-signup.component';

describe('UkhesheSignupComponent', () => {
  let component: UkhesheSignupComponent;
  let fixture: ComponentFixture<UkhesheSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkhesheSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkhesheSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
