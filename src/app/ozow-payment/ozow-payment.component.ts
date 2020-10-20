import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ozow-payment',
  templateUrl: './ozow-payment.component.html',
  styleUrls: ['./ozow-payment.component.css']
})
export class OzowPaymentComponent implements OnInit {

  @Input() paymentUrl: string

  constructor() { }

  ngOnInit(): void {
  }

}
