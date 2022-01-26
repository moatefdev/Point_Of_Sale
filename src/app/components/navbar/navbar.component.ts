import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SettingsService } from 'src/app/shared/settings.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  theStoreName = '';
  user_fullName = '';
  user_Position = 'admin';
  hidden = true; // important

  constructor(
    private storeName: SettingsService,
    private route: Router,
    private user: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.setStoreName();
    this.getUserFullName();
    this.getUserPosition();
  }

  setStoreName() {
    console.log('store', this.storeName.getTheStoreName());
    this.theStoreName = this.storeName.getTheStoreName();
  }

  toggleTopbarMenu(): boolean {
    return (this.hidden = !this.hidden);
  }

  getUserFullName() {
    this.user_fullName = localStorage.getItem('fullname')!;
  }

  getUserPosition() {
    if (window.localStorage.getItem('admin') === 'true') {
      this.user_Position = 'admin';
    } else {
      this.user_Position = 'cashier';
    }
  }

  logOut() {
    this.cookieService.delete('access_token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('admin');
    this.route.navigate(['/login']);
  }
}
