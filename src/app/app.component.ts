import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  profile: any;

  constructor(public auth: AuthService) {
    auth.handleAuthentication(() => {
      this.initProfile();
    });
  }

  ngOnInit() {
    this.initProfile();
  }

  logout() {
    this.profile = undefined;
    this.auth.logout();
  }

  initProfile() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      if (this.auth.isAuthenticated()) {
        this.auth.getProfile((err: any, profile: any) => {
          this.profile = profile;
        });
      }
    }
  }

}
