import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/shared/settings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  theStoreName = '';
  current_user_fullName = '';
  user_Position = '';
  hidden = true; // important

  constructor(private storeName: SettingsService, private route: Router) {}

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
    // console.log(JSON.parse(CURRENT_USER_SESSION));
    this.current_user_fullName = JSON.parse(
      String(sessionStorage.getItem('current_user'))
    ).name;
    console.log(this.current_user_fullName);
  }

  getUserPosition() {
    this.user_Position = JSON.parse(
      String(sessionStorage.getItem('current_user'))
    ).position;
    console.log(this.user_Position);
  }
  logOut() {
    window.sessionStorage.removeItem('current_user');
    this.route.navigate(['/login']);
  }
}
