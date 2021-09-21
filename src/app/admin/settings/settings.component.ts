import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from 'src/app/shared/settings';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  storeName: any = '';
  constructor(
    private settings: SettingsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.storeName = window.localStorage.getItem('storeName');
    console.log(this.storeName);
  }
  saveSettings(settings: NgForm) {
    const storeName = settings.value;
    console.log(storeName);
    console.log(storeName.storeName);
    if (storeName.storeName == '') {
      this.toastr.error('Please, enter the store name', 'Store Name', {
        timeOut: 1700,
      });
    } else {
      this.settings.saveTheStoreName(storeName.storeName);
      this.toastr.success('Done', 'Store Name', {
        timeOut: 1700,
      });
    }
  }
}
