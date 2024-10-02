import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GooglePlace } from './google-place';

declare var google: any

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.css']
})
export class PlaceAutocompleteComponent implements OnInit {

  @Output() addressChanged: EventEmitter<string> = new EventEmitter();
  @Output() latitudeChanged: EventEmitter<number> = new EventEmitter();
  @Output() longitudeChanged: EventEmitter<number> = new EventEmitter();
  private addressString: string
  private _lat: number
  private _long: number
  
  formId = (Math.random() * 100000).toString()

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var input: HTMLInputElement = document.getElementById(this.formId) as HTMLInputElement;
    var options = {
      componentRestrictions: {
        country: ["ZA"]
      }
    }
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', () => {
      var place : GooglePlace = JSON.parse(JSON.stringify(autocomplete.getPlace()))
      this.address = place.formatted_address
      this.lat = place.geometry.location.lat
      this.long = place.geometry.location.lng
      console.log(`location is ${typeof place}`)
    });
  }

  get address(): string {
    return this.addressString;
  }

  @Input()
  set address(address: string) {
    this.addressString = address
    this.addressChanged.emit(address);
  }

  get lat(): number {
    return this._lat;
  }

  set lat(lat: number) {
    this._lat = lat
    this.latitudeChanged.emit(this._lat);
  }

  get long(): number {
    return this._long;
  }

  set long(long: number) {
    this._long = long
    this.longitudeChanged.emit(this._long);
  }

}
