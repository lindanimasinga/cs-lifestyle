import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from './service/storage-service.service';
import { Utils } from './utils/utils';

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
document.body.classList.toggle('dark-theme', prefersDarkScheme.matches);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'cs-clothing-web';

  constructor(private router: Router, private storage: StorageService) {
  }

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.configureScrollEffects()
        this.applyTheme()
      }
    });
    
  }
  
  applyTheme() {
  }

  private configureScrollEffects() {

    setTimeout(() => {
      if (document.getElementsByName("scrollTo")[0]) {
        document.getElementsByName("scrollTo")[0].scrollIntoView();
        window.scrollBy(0, -76)
      }
    }, 1)
  }

  deferredPrompt: any;
  @HostListener('beforeinstallprompt', ['$event']) 
  documentClickEvent($event: any) {
    console.log("beforeinstallprompt called")
    // Prevents the default mini-infobar or install dialog from appearing on mobile
    $event.preventDefault();
    // Save the event because you'll need to trigger it later.
    this.deferredPrompt = $event;
    // Show your customized insta ll prompt for your PWA
    // Your own UI doesn't have to be a single element, you
    // can have buttons in different locations, or wait to prompt
    // as part of a critical journey.
    //this.showInAppInstallPromotion();
  }

  async showInAppInstallPromotion() {
      // deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
    this.deferredPrompt.prompt();
    // Find out whether the user confirmed the installation or not
    const { outcome } = await this.deferredPrompt.userChoice;
    // The deferredPrompt can only be used once.
    this.deferredPrompt = null;
    // Act on the user's choice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt.');
    } else if (outcome === 'dismissed') {
      console.log('User dismissed the install prompt');
    }
  } 

}

