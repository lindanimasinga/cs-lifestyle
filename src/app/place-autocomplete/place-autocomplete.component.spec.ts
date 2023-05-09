import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlaceAutocompleteComponent } from './place-autocomplete.component';

describe('PlaceAutocompleteComponent', () => {
  let component: PlaceAutocompleteComponent;
  let fixture: ComponentFixture<PlaceAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
