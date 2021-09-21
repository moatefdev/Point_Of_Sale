import { Component, OnInit } from '@angular/core';
import { SelectedItemsService } from 'src/app/shared/selectedItems';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
})
export class KitchenComponent implements OnInit {
  orderedFood: any;
  constructor(private invoiceItems: SelectedItemsService) {}

  ngOnInit(): void {
    this.orderedFood = this.invoiceItems.invoiceItemsValue();
    console.log(this.orderedFood);
  }
}
