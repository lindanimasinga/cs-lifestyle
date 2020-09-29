import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkhesheAuthResponseComponent } from './ukheshe-auth-response.component';

describe('UkhesheAuthResponseComponent', () => {
  let component: UkhesheAuthResponseComponent;
  let fixture: ComponentFixture<UkhesheAuthResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkhesheAuthResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkhesheAuthResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
