import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var firebase: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'cs-clothing-web';

  constructor(private router: Router) {
  }

  ngOnInit() {
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
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.configureScrollEffects()
      }
    });
    
  }

  private configureScrollEffects() {

    setTimeout(() => {
      if (document.getElementsByName("scrollTo")[0]) {
        document.getElementsByName("scrollTo")[0].scrollIntoView();
        window.scrollBy(0, -76)
      }
    }, 1)
  }
}
