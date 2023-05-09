import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StoresComponent } from './stores.component';

describe('StoresComponent', () => {
  let component: StoresComponent;
  let fixture: ComponentFixture<StoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
