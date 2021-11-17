import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  storeName: any = '';
  storeAddress: any = '';
  storePhoneNumber: any = '';
  storeEmail: any = '';

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
}
