import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OtherItemsComponent } from './other-items.component';

describe('OtherItemsComponent', () => {
  let component: OtherItemsComponent;
  let fixture: ComponentFixture<OtherItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
