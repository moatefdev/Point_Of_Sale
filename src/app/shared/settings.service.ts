import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
@Injectable()
export class SettingsService {
  storeName: any = '';
  storeAddress: any = '';
  storePhoneNumber: any = '';
  storeEmail: any = '';

  constructor(
    private route: Router,
    private urlPath: ActivatedRoute,
    private user: UserService,
    private cookieService: CookieService
  ) {}

  saveTheStoreName(
    name: string,
    address: string,
    phone: string,
    email: string
  ) {
    localStorage.setItem('storeName', name);
    localStorage.setItem('storeAddress', address);
    localStorage.setItem('storePhoneNumber', phone);
    localStorage.setItem('storeEmail', email);
  }

  getTheStoreName() {
    this.storeName = localStorage.getItem('storeName');
    return this.storeName;
  }
  getTheStoreAddress() {
    this.storeAddress = localStorage.getItem('storeAddress');
    return this.storeAddress;
  }
  getTheStorePhoneNumber() {
    this.storePhoneNumber = localStorage.getItem('storePhoneNumber');
    return this.storePhoneNumber;
  }
  getTheStoreEmail() {
    this.storeEmail = localStorage.getItem('storeEmail');
    return this.storeEmail;
  }
  isUserLoggedIn() {
    const user = this.cookieService.get('access_token');
    console.log('cookie', user);
    if (user == '') {
      alert('Login required to access this page.');
      this.route.navigate(['/login']);
    }
  }
}
