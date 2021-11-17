// import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodItems } from '../../shared/foodItems';
import {
  IAllFood,
  IFoodItems,
  ISelectedItems,
} from '../../shared/generalObject';
import { SelectedItemsService } from '../../shared/selectedItems';
import { SettingsService } from '../../shared/settings';
// import { CURRENT_USER_SESSION } from './../../shared/registerDB';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
})
export class PosComponent implements OnInit {
  theStoreName = '';
  current_user_fullName = '';
  user_Position = '';
  hidden = true; // important
  allCateBtnHidden = true;
  foodCategories: any | Array<IFoodItems> = []; // important
  food: any | Array<IFoodItems> = []; // important
  allFood: IAllFood = {}; // important
  selectedItems: Array<ISelectedItems> = []; // important
  formItems: Array<ISelectedItems> = []; // Not very important --- for testing
  qty = 1; // Not very important --- for testing
  tablesNumbers = 10;
  tables: any = [];
  invoiceForm: FormGroup;
  table: any;
  numberOfTable: number = 0;
  itemPriceTotal: number = 0;
  total: number = 0;
  constructor(
    private foodService: FoodItems,
    private invoiceItems: SelectedItemsService,
    private storeName: SettingsService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.invoiceForm = new FormGroup({
      whereToEat: new FormControl(null, Validators.required),
      itemName: new FormControl('', Validators.required),
      qty: new FormControl(1, Validators.required),
      itemPrice: new FormControl(0, Validators.required),
      items: new FormArray([], Validators.required),
      clientName: new FormControl('', Validators.required),
      clientPhone: new FormControl('', Validators.required),
      clientAddress: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    // this.getUserFullName();
    this.categoryItems();
    this.foodItemDetails();
    this.generateTables();
    this.getFormArrayObject();
    console.log(this.food);
    console.log(this.tables);
  }

  //#region
  // ngAfterContentInit(): void {
  //   //Called after ngOnInit when the component's or directive's content has been initialized.
  //   //Add 'implements AfterContentInit' to the class.
  //   this.setStoreName();
  // }

  // setStoreName() {
  //   console.log('store', this.storeName.getTheStoreName());
  //   this.theStoreName = this.storeName.getTheStoreName();
  // }

  // toggleTopbarMenu(): boolean {
  //   return (this.hidden = !this.hidden);
  // }

  // getUserFullName() {
  //   // console.log(JSON.parse(CURRENT_USER_SESSION));
  //   this.current_user_fullName = JSON.parse(
  //     String(sessionStorage.getItem('current_user'))
  //   ).name;
  //   console.log(this.current_user_fullName);
  // }
  //#endregion

  categoryItems(): any {
    // tslint:disable-next-line: no-shadowed-variable
    this.foodService.getItemsCategory().subscribe((data: any) => {
      window.setTimeout(() => {
        this.foodCategories = data;
      }, 2000);
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
  onCategoryClick(item: string) {
    console.log(item);
    if (item === 'all') {
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

  getFormArrayObject() {
    let myArray = <FormArray>this.invoiceForm.get('items');
    console.log('myArray:', myArray);
    return myArray;
  }

  addSelectedItems(item: ISelectedItems): any {
    // debugger;

    if (this.selectedItems.length !== 0) {
      this.selectedItems = [];
    }

    if (this.selectedItems.length === 0) {
      this.selectedItems.push({
        itemId: item.itemId,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemQty: 1,
        isSelected: true,
      });
    } else {
      for (let i = 0; i <= this.selectedItems.length; i++) {
        if (item.itemId === this.selectedItems[i].itemId) {
          break;
        } else {
          this.selectedItems.push({
            itemId: item.itemId,
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            itemQty: 1,
            isSelected: true,
          });
        }
      }
    }

    console.log(this.selectedItems);

    const myArray = this.getFormArrayObject();
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (this.checkItemAdded(myArray, this.selectedItems[i])) {
        continue;
      }
      myArray.push(
        new FormGroup({
          itemId: new FormControl(this.selectedItems[i].itemId),
          itemName: new FormControl(this.selectedItems[i].itemName),
          qty: new FormControl(this.selectedItems[i].itemQty),
          itemPrice: new FormControl(this.selectedItems[i].itemPrice),
        })
      );
    }
    console.log(myArray);
    console.log(this.selectedItems);
    console.log('item:', item);
    // this.calcTotalPrice();
    this.getItemsArray();
  }

  getItemsArray() {
    const itemsArray = (<FormArray>this.invoiceForm.get('items')).controls;
    console.log('itemsArray:', itemsArray);
    return itemsArray;
  }

  // Delete item
  // tslint:disable-next-line: typedef
  onDelete(i: number) {
    const myArray = this.getFormArrayObject();
    myArray.removeAt(i);
    // (<FormArray>this.invoiceForm.get('items')).clear();
    // this.selectedItems.filter((item) => {
    //   return item.itemId !== i + 1;
    // });
    this.selectedItems = [];
    console.log(myArray);
  }

  // Check If item is added function
  checkItemAdded(items: FormArray, selectedItems: ISelectedItems) {
    // debugger;
    for (let item of items.controls) {
      console.log(items.controls);
      if (item.get('itemId')?.value === selectedItems.itemId) {
        let itemQty = item.get('qty');
        let itemQtyValue = item.get('qty')?.value;
        console.log(itemQtyValue);
        itemQty?.patchValue(itemQtyValue + 1);
        return true;
      }
    }
    return false;
  }

  // Generate Tables
  // tslint:disable-next-line: typedef
  generateTables() {
    for (let i = 0; i < this.tablesNumbers; i++) {
      this.tables.push(i + 1);
    }
  }

  tableNumber(table: number) {
    this.numberOfTable = table;
  }

  calcItemPrice(selectedItem: any) {
    // console.log(this.food.itemPrice);
    const itemPrice = this.selectedItems[selectedItem].itemPrice;
    const itemQty = this.invoiceForm.get('qty')?.value;
    this.itemPriceTotal = itemQty * itemPrice;
    console.log(this.itemPriceTotal);
  }

  calcTotalPrice() {
    // for (let i = 0; i < this.selectedItems.length; i++) {
    //   this.total += this.selectedItems[i].itemPrice;
    // }
    const items = this.invoiceForm.get('items')?.value;
    console.log(this.total);
    console.log(typeof this.total);
    this.total = 0;
    for (const item of items) {
      this.total += item.qty * item.itemPrice;
    }
  }

  // Form on Save
  // tslint:disable-next-line: typedef

  onSave() {
    // Add Where to eat to the service
    const whereToEatValue = this.invoiceForm.get('whereToEat')?.value;
    if (whereToEatValue === 'Table') {
      this.invoiceItems.invoiceWhere(
        this.invoiceForm.get('whereToEat')?.value + ' ' + this.numberOfTable
      );
    } else {
      this.invoiceItems.invoiceWhere(this.invoiceForm.get('whereToEat')?.value);
    }

    console.log(...this.invoiceForm.get('items')?.value);
    // console.log('after', this.selectedItems);

    this.invoiceItems.invoiceItems(
      this.invoiceForm.get('items')?.value,
      this.total
    );
    this.checkClientDetailsValidation();
    // console.log(this.invoiceForm.get('clientName')?.value);
    this.calcTotalPrice();
    // console.log('Form values:', this.invoiceForm.value);
  }

  checkClientDetailsValidation() {
    const clientName = this.invoiceForm.get('clientName'),
      clientPhone = this.invoiceForm.get('clientPhone'),
      clientAddress = this.invoiceForm.get('clientAddress');
    if (
      clientName?.valid == false ||
      clientPhone?.valid == false ||
      clientAddress?.valid == false
    ) {
      this.toastr.warning(
        'Please, enter all client details!',
        'Client Details',
        {
          timeOut: 2000,
        }
      );
    } else {
      this.invoiceItems.invoiceClientDetails(
        clientName,
        clientPhone,
        clientAddress
      );
      this.toastr.success('Done', 'Client Details', {
        timeOut: 1500,
      });
      this.toastr.info('Sending data...', 'Invoice Details', {
        timeOut: 1700,
      });
    }
  }
}
