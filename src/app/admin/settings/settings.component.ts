import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from 'src/app/shared/settings.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  storeName: any = '';
  storeAddress: any = '';
  storePhoneNumber: any = '';
  storeEmail: any = '';
  constructor(
    private settings: SettingsService,
    private toastr: ToastrService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.user.checkUserLoggdInAndAuthorized();
    this.storeName = window.localStorage.getItem('storeName');
    this.storeAddress = window.localStorage.getItem('storeAddress');
    this.storePhoneNumber = window.localStorage.getItem('storePhoneNumber');
    this.storeEmail = window.localStorage.getItem('storeEmail');
  }
  saveSettings(settings: NgForm) {
    const settingsValue = settings.value;
    console.log(settingsValue);
    console.log(settingsValue.storeName);
    if (
      settingsValue.storeName == '' ||
      settingsValue.storeAddress == '' ||
      settingsValue.storePhoneNumber == '' ||
      settingsValue.storeEmail == ''
    ) {
      this.toastr.error('Please, enter all store info', 'Store Info', {
        timeOut: 1700,
      });
    } else {
      this.settings.saveTheStoreName(
        settingsValue.storeName,
        settingsValue.storeAddress,
        settingsValue.storePhoneNumber,
        settingsValue.storeEmail
      );
      this.toastr.success('Done', 'Store Info', {
        timeOut: 1700,
      });
    }
  }
}
