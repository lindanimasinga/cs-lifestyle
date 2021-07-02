import { Component, Input, OnInit } from '@angular/core';
import { StoreProfile } from '../model/storeProfile';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.css']
})
export class StoreCardComponent implements OnInit {

  @Input()
  store: StoreProfile

  constructor() { }

  ngOnInit(): void {
  }

}
