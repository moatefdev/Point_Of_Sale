import { Component, OnInit } from '@angular/core';
import { SelectedItemsService } from 'src/app/shared/selectedItems';
import { SettingsService } from 'src/app/shared/settings';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
})
export class KitchenComponent implements OnInit {
  orderedFood: any;
  constructor(
    private invoiceItems: SelectedItemsService,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.settings.isUserLoggedIn();
    this.orderedFood = this.invoiceItems.invoiceItemsValue();
    console.log(this.orderedFood);
  }
}
