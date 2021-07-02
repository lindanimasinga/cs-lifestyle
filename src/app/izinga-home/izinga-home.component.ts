import { Component, OnInit } from '@angular/core';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';

@Component({
  selector: 'app-izinga-home',
  templateUrl: './izinga-home.component.html',
  styleUrls: ['./izinga-home.component.css']
})
export class IzingaHomeComponent implements OnInit {

  address: string
  lat: number = 0
  long: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}
