import { Component, OnInit } from '@angular/core';
import { StoreProfile } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private izingaService: IzingaOrderManagementService, private storage: StorageService) { }

  ngOnInit(): void {
  }

  get shop(): StoreProfile {
    return this.storage.shop
  }

}
