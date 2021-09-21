import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  storeName: any;

  saveTheStoreName(name: string) {
    localStorage.setItem('storeName', name);
  }

  getTheStoreName() {
    this.storeName = localStorage.getItem('storeName');
    return this.storeName;
  }
}
