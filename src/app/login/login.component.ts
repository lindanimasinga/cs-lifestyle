import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FirebaseService } from '../service/firebase.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import { UserProfile } from '../model/userProfile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isVerificationRequested = false
  phoneNumber: string
  hasError: boolean
  errorMessage: string
  code: string
    userProfile: UserProfile = {
    imageUrl: "https://pbs.twimg.com/media/C1OKE9QXgAAArDp.jpg",
    role: UserProfile.RoleEnum.CUSTOMER
  };

  constructor(private izingaOrderManager: IzingaOrderManagementService,
    private storageService: StorageService,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log("Capture created")
    this.firebaseService.createCapture();
  }

  resend() {
    this.isVerificationRequested = false
  }

  verify() {
    this.phoneNumber = this.phoneNumber.startsWith("+27")? this.phoneNumber : this.phoneNumber.startsWith("0") ? 
      this.phoneNumber.replace("0", "+27") : this.phoneNumber.startsWith("27") ? "+" + this.phoneNumber : "+27" +this.phoneNumber;
    this.firebaseService.requestVerification(this.phoneNumber)
      .subscribe(() => {
        this.isVerificationRequested = true
        this.hasError = false;
      }, (error) => {
        this.hasError = true;
        this.errorMessage = error.message;
      })
  }

  confirmCode() {
    this.firebaseService.confirmCode(this.code)
      .subscribe(cred => {
        this.findCustomer()
        this.storageService.phoneVerified = true
        this.storageService.phoneNumber = this.phoneNumber
        document.getElementsByName("scrollTo")[0].scrollIntoView();
        window.scrollBy(0, -76)
      }, (error) => {
        console.log(error)
      })
  }

  findCustomer() {
    this.izingaOrderManager.getCustomerByPhoneNumber(this.phoneNumber)
    .pipe(
      catchError(error => {
        if(error.status === 404) {
          console.log("User not found")
          this.userProfile.mobileNumber = this.phoneNumber
          return this.createCustomer()
        } else {
          return throwError(error); 
        }
      }),
    )
    .subscribe(user => {
      if (user) {
        this.userProfile = user
        this.storageService.userProfile = user;
      }
      location.href = document.referrer
    })
  }

    createCustomer(): Observable<UserProfile> {
      return this.izingaOrderManager.registerCustomer(this.userProfile)
      .pipe(map(user => {
        this.userProfile = user
        this.storageService.userProfile = user;
        return user;
      }))
    }

}
