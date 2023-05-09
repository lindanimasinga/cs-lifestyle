import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IzingaHomeComponent } from './izinga-home.component';

describe('IzingaHomeComponent', () => {
  let component: IzingaHomeComponent;
  let fixture: ComponentFixture<IzingaHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IzingaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzingaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
