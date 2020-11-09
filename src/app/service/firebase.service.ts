import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  recaptchaVerifier: any;
  confirmResults: firebase.default.auth.ConfirmationResult;

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyDS5nZrHe5On5jyUUl_mCjr2QRSc_N3Jwo",
      authDomain: "cs-clothing.firebaseapp.com",
      databaseURL: "https://cs-clothing.firebaseio.com",
      projectId: "cs-clothing",
      storageBucket: "cs-clothing.appspot.com",
      messagingSenderId: "705023698499",
      appId: "1:705023698499:web:7d53f4b87c0fe9c3fa56f6"
    }
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
  }

  createCapture() {
    this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier('recaptcha-container');
    this.recaptchaVerifier.render()
  }


  requestVerification(phoneNumber: string): Observable<firebase.default.auth.ConfirmationResult> {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = phoneNumber.startsWith("0") ? phoneNumber.replace("0", "+27") : "+27" + phoneNumber;

    var promise = firebase.default.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
    return from(promise)
      .pipe(
        map(resp => this.confirmResults = resp)
      )
  }

  confirmCode(code: string) {
    return from(this.confirmResults
      .confirm(code))
  }
}
