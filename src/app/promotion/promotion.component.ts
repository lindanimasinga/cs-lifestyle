import { Component, Input, OnInit } from '@angular/core';
import { Promotion } from '../model/promotion';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  @Input()
  promotion: Promotion

  constructor() { }

  ngOnInit(): void {
  }

}
