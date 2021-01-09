import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  recaptchaVerifier: any;
  confirmResults: firebase.default.auth.ConfirmationResult;

  constructor() {
    var firebaseConfig = {
      apiKey: environment.firebase_apiKey,
      authDomain: environment.authDomain,
      databaseURL: environment.databaseURL,
      projectId: environment.projectId,
      messagingSenderId: environment.messagingSenderId,
      appId: environment.appId,
      measurementId: environment.measurementId
    };
      // Initialize Firebase
      firebase.default.initializeApp(firebaseConfig);
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
  }
}
