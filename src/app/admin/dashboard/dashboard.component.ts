import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodItems } from './../../shared/foodItems';
import {
  IAllFood,
  IFoodItems,
  ISelectedItems,
} from '../../shared/generalObject';
import { SelectedItemsService } from '../../shared/selectedItems';
import { DashboardService } from '../../shared/dashboard.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  foodCategories: Array<IFoodItems> = [];
  allFood: IAllFood = {}; // important
  food: Array<IFoodItems> = []; // important
  mytable: any;
  // @ViewChild('mytable', { static: false }) table: any;
  // dtOptions: DataTables.Settings = {};
  constructor(
    private foodService: FoodItems,
    private invoiceItems: SelectedItemsService,
    private addCate: DashboardService
  ) {}

  ngOnInit(): void {
    $(document).ready(function () {
      $('#myTable').DataTable();
    });
    // this.mytable = $(this.table.nativeElement);
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true,
    // };
    // this.mytable.DataTable();
    this.categoryItems();
    this.foodItemDetails();
  }

  categoryItems(): any {
    // tslint:disable-next-line: no-shadowed-variable
    this.foodService.getItemsCategory().subscribe((data: any) => {
      this.foodCategories = data;
    });
  }

  foodItemDetails(): any {
    // tslint:disable-next-line: no-shadowed-variable
    this.foodService.getAllFoodItems().subscribe((data) => {
      this.allFood = data ? data[0] : {};
      console.log('the food:', data[0]);
    });
  }

  // tslint:disable-next-line: typedef
  onCategoryChange(item: any) {
    console.log(item);
    if (item === 'All') {
      let foods: any[] = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < Object.keys(this.allFood).length; i++) {
        const allFoodCate = this.allFood[Object.keys(this.allFood)[i]];
        foods = [...foods, ...allFoodCate];
        // foods.push(allFoodCate[i]);
        console.log(foods);
      }
      this.food = foods;
    } else {
      this.food = this.allFood[item];
    }
    console.log(this.food);
  }

  // onCategoryChange(item: any) {
  //   alert(item);
  // }

  filterItems(select: string) {
    // alert(event.target.value);
    console.log(select);
  }

  onEdit(item: any) {
    console.log('Edited');
    // document.querySelector('button.btn.btn-primary').click()
  }

  onDelete(item: IFoodItems) {
    // console.log(index);
    // debugger;
    const deleteItem = this.food.filter((theItem) => {
      return theItem.itemId !== item.itemId;
    });
    // console.log(item.itemId);
    // console.log(deleteItem);
    this.food = deleteItem;
    // console.log(this.food);
  }

  addCategory(addCate: NgForm) {
    console.log(addCate.value.cateName);
    this.addCate.postCategory(addCate.value.cateName);
  }
}
