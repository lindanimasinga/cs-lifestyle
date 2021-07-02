import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var input: HTMLInputElement = document.getElementById('searchTextField') as HTMLInputElement;
    var options = {
      componentRestrictions: {
        country: ["ZA"]
      }
    }
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace()
      this.address = place.formatted_address
      this.latitudeChanged.emit(place.geometry.location.lat)
      this.longitudeChanged.emit(place.geometry.location.long)
      console.log(`location is ${place.geometry.location.long}`)
    });
  }

  get address(): string {
    return this.addressString;
  }

  @Input()
  set address(address: string) {
    this.addressString = address
    console.log(`address changed ${address}`)
    this.addressChanged.emit(address);
  }

  public onAddressChange(address: any) {
    this.address = address.formatted_address
    console.log(`address changed ${this.address}`)
    this.addressChanged.emit(this.address);
  }

  public onALatitudeChange(address: any) {
    this.addressChanged.emit(this.address);
  }

}
