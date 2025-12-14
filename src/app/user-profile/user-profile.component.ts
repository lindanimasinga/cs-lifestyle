import { Component, OnInit } from '@angular/core';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import { UserProfile } from '../model/userProfile';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  ewallet?: string
  paymentType = "EWALLET"

  userProfile: UserProfile = {
    imageUrl: "https://pbs.twimg.com/media/C1OKE9QXgAAArDp.jpg",
    role: UserProfile.RoleEnum.CUSTOMER,
    bank: {
      type: "EWALLET",
      name: "FNB",
      accountId: ""
    }
  }

  constructor(
    private izingaOrderManager: IzingaOrderManagementService,
    private storageService: StorageService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    // Load existing user profile
    if (this.storageService.userProfile) {
      this.userProfile = this.storageService.userProfile;
      this.ewallet = this.userProfile.mobileNumber;
      this.paymentType = this.userProfile.bank?.type == 'EWALLET' ? "EWALLET" : "BANK_ACC";
    }
  }

  get userExist(): boolean {
    return this.userProfile.id != null;
  }

  get phoneNumber(): string | undefined {
    return this.userProfile.mobileNumber
  }

  set phoneNumber(phoneNumber: string | undefined) {
    this.userProfile.mobileNumber = phoneNumber
  }

  get emailAddress(): string | undefined {
    return this.userProfile.emailAddress
  }

  set emailAddress(emailAddress: string | undefined) {
    this.userProfile.emailAddress = emailAddress
  }

  get bankName(): string {
    return this.userProfile.bank?.name || ""
  }

  set bankName(name: string) {
    if (!this.userProfile.bank) {
      this.userProfile.bank = {
        type: "BANK_ACC",
        name: "",
        accountId: ""
      }
    }
    this.userProfile.bank.name = name
  }

  get accountNumber(): string {
    return this.userProfile.bank?.accountId || ""
  }

  set accountNumber(accountId: string) {
    if (!this.userProfile.bank) {
      this.userProfile.bank = {
        type: "BANK_ACC",
        name: "",
        accountId: ""
      }
    }
    this.userProfile.bank.accountId = accountId
  }

  ewalletSelected() {
    this.paymentType = 'EWALLET'
    this.ewallet = this.userProfile.mobileNumber
    if (!this.userProfile.bank) {
      this.userProfile.bank = {
        type: "EWALLET",
        name: "FNB",
        accountId: ""
      }
    }
    this.userProfile.bank.type = "EWALLET"
  }

  createCustomer() {
    if (!this.userProfile.bank) {
      this.userProfile.bank = {
        type: this.paymentType === 'EWALLET' ? "EWALLET" : "BANK_ACC",
        name: this.paymentType === 'EWALLET' ? "FNB" : this.bankName,
        accountId: this.paymentType === 'EWALLET' ? "" : this.accountNumber
      }
    }

    this.izingaOrderManager.registerCustomer(this.userProfile)
      .subscribe(user => {
        this.userProfile = user;
        this.storageService.userProfile = user;
        this.router.navigate(['../dashboard']);
      });
  }

  updateCustomer() {
    if (!this.userProfile.bank) {
      this.userProfile.bank = {
        type: this.paymentType === 'EWALLET' ? "EWALLET" : "BANK_ACC",
        name: this.paymentType === 'EWALLET' ? "FNB" : this.bankName,
        accountId: this.paymentType === 'EWALLET' ? "" : this.accountNumber
      }
    }

    // Use registerCustomer for now since there's no update method
    this.izingaOrderManager.registerCustomer(this.userProfile)
      .subscribe(user => {
        this.userProfile = user;
        this.storageService.userProfile = user;
        alert("Profile updated successfully!");
      });
  }

}
