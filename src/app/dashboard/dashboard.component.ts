import { Component } from '@angular/core';
import { StorageService } from '../service/storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private storageService: StorageService, private router: Router) {
  }

  ngOnInit() {
    var userProfile = this.storageService.userProfile
    console.log(`user is ${userProfile}`)
    if(userProfile == null) {
      this.router.navigate(['login'])
      return
    }
  }

  get userId() {
    return this.storageService.userProfile.id
  }

  logout() {
    this.storageService.logout()
    this.router.navigate(['login'])
  }

}
