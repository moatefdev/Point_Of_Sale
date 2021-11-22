import { Component, Input, OnInit } from '@angular/core';
import { IInvoiceItems } from 'src/app/shared/generalObject';
import { SelectedItemsService } from 'src/app/shared/selectedItems';
import { SettingsService } from '../../shared/settings';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.css'],
})
export class InvoicePrintComponent implements OnInit {
  invoicePlace: any;
  invoiceItems: any;
  theTotal = 0;
  theStoreName: string = '';
  theStoreAddress: any = '';
  theStorePhoneNumber: any = '';
  theStoreEmail: any = '';
  shortDate = '';
  time = '';
  invoiceNumber = 0;
  constructor(
    private theInvoiceItems: SelectedItemsService,
    private storeName: SettingsService,
    private storeAddress: SettingsService,
    private storePhoneNumber: SettingsService,
    private storeEmail: SettingsService,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.settings.isUserLoggedIn();
    this.theStoreName = this.storeName.getTheStoreName();
    this.theStoreAddress = this.storeAddress.getTheStoreAddress();
    this.theStorePhoneNumber = this.storePhoneNumber.getTheStorePhoneNumber();
    this.theStoreEmail = this.storeEmail.getTheStoreEmail();
    this.invoicePlace = this.theInvoiceItems.invoiceWhereValue();
    // this.invoiceItems = this.theInvoiceItems.invoiceItemsValue();
    console.log(this.invoicePlace);
    console.log('InvoiceItems: ', this.invoiceItems);

    this.invoiceItems = this.theInvoiceItems.invoiceItemsValue();
    this.total();
    setTimeout(() => {
      window.print();
    }, 2500);
    this.randomNumber(1, 10);
    this.getDate();
  }

  // Function to generate random number
  randomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    this.invoiceNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(this.invoiceNumber);
  }

  total() {
    for (const item of this.invoiceItems) {
      this.theTotal += item.qty * item.itemPrice;
    }
  }

  // Get the date to display it in the invoice
  getDate() {
    let date = new Date();
    const months = date.getMonth(),
      days = date.getDay(),
      years = date.getFullYear(),
      hours = date.getHours(),
      mins = date.getMinutes(),
      seconds = date.getSeconds();
    this.shortDate = `${days}/${months}/${years}`;
    this.time = `${hours}:${mins}:${seconds}`;
    console.log(date);
    console.log(this.shortDate);
    console.log(this.time);
  }
}
