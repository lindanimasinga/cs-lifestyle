import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzingaHomeComponent } from './izinga-home.component';

describe('IzingaHomeComponent', () => {
  let component: IzingaHomeComponent;
  let fixture: ComponentFixture<IzingaHomeComponent>;

  beforeEach(async(() => {
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
