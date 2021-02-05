import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  recaptchaVerifier: any;
  confirmResults: firebase.default.auth.ConfirmationResult;

  constructor(private storage: StorageService) {
    // Initialize Firebase
    firebase.default.initializeApp(environment);
  }

  createCapture() {
    this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier('recaptcha-container');
    this.recaptchaVerifier.render()
  }


  requestVerification(phoneNumber: string): Observable<firebase.default.auth.ConfirmationResult> {
    const appVerifier = this.recaptchaVerifier;
    var promise = firebase.default.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    return from(promise)
      .pipe(
        map(resp => this.confirmResults = resp)
      )
  }

  confirmCode(code: string) {
    return from(this.confirmResults
      .confirm(code))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.storage.errorMessage = error.message
          return throwError(error)
        })
      )
  }
}
