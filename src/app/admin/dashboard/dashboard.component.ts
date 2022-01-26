import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodItems } from '../../shared/foodItems.service';
import { IFoodItems } from '../../shared/generalObject';
import { DashboardService } from '../../shared/dashboard.service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  foodCategories: any[] | Array<IFoodItems> = [];
  food: any[] | Array<IFoodItems> = []; // important
  mytable: any;
  products: any[] = [];
  uploadedFile: any;
  notVisibleProducts: any[] = [];
  users: any[] = [];
  itemToUpdate: any[] = [];
  @ViewChild('closeAddCategoryModal') closeAddCategoryModal:
    | ElementRef
    | undefined;
  constructor(
    private foodService: FoodItems,
    private dashService: DashboardService,
    private user: UserService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user.checkUserLoggdInAndAuthorized();
    this.categoryItems();
    this.getProducts();
    this.getRemovedProducts();
  }

  //#region ======== Product Tab Methods ==========
  categoryItems(): any {
    // tslint:disable-next-line: no-shadowed-variable
    this.foodService.getItemsCategory().subscribe((data: any) => {
      this.foodCategories.push(...data.category);
      console.log(this.foodCategories);
    });
  }

  getProducts(): any {
    this.foodService.getProducts().subscribe((data: any) => {
      this.products.push(...data.products);
    });
    console.log(this.products);
    return this.products;
  }

  // tslint:disable-next-line: typedef
  onCategoryChange(item: any) {
    console.log(item);
    if (item === 'All') {
      if (this.food.length !== 0) {
        this.food.length = 0;
      }
      // tslint:disable-next-line: prefer-for-of
      console.log(this.products);
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].isVisible === true) {
          this.food.push(this.products[i]);
        }
      }
    } else {
      const returnedObj = this.products.filter((prod: any) => {
        return prod.category == item && prod.isVisible == true;
      });
      this.food = returnedObj;
    }

    console.log(this.foodCategories);
    console.log(this.food);
  }

  //#region ======== Methods related to `updating` a product ==========
  onUpdate(item: any) {
    this.itemToUpdate.length = 0;
    this.itemToUpdate.push(item);
    console.log(this.itemToUpdate);
  }

  editProduct(data: NgForm) {
    const closeElement: HTMLButtonElement = document.getElementById(
      'closeUpdateProduct'
    ) as HTMLButtonElement;
    const { category, itemName, itemPrice } = data.value;
    let productId = '';
    this.itemToUpdate.map((item) => {
      productId = item._id;
    });
    const updatedProduct = {
      category,
      name: itemName,
      price: itemPrice,
    };
    console.log(updatedProduct);
    this.dashService
      .updateProduct(productId, updatedProduct)
      .subscribe((data: any) => {
        this.toastr.success(data.message, 'Product Update');
      });
    closeElement.click();
  }
  //#endregion

  // Hide Product
  onRemove(item: any) {
    console.log(item);
    this.dashService.hideProduct(item._id);
    this.food = this.food.filter((theItem) => theItem._id !== item._id);
    this.toastr.success('Product Removed Successfuly.', 'Removing a Product');
  }
  //#endregion

  //#region ========== Actions Tab Methods ==========

  // Add Category
  insertCategory(addCate: NgForm) {
    const closeElement: HTMLButtonElement = document.getElementById(
      'closeAddCategory'
    ) as HTMLButtonElement;
    console.log(addCate.value.cateName);
    this.dashService.addCategory(addCate.value.cateName);
    closeElement.click();
  }

  removeCategory(cate: any) {
    const closeElement: HTMLButtonElement = document.getElementById(
      'closeRemoveCategory'
    ) as HTMLButtonElement;
    // console.log(cate.options[cate.selectedIndex].value);
    this.dashService.removeCategory(cate.options[cate.selectedIndex].value);
    this.toastr.success('Category Removed Successfuly.', 'Removing a Category');
    closeElement.click();
  }
  //#region ========== Methods related to `adding` a new product ==========
  // Uploading File
  onFileChanged(inputfile: any) {
    this.uploadedFile = inputfile.files[0];
  }

  addProduct(data: any) {
    const closeElement: HTMLButtonElement = document.getElementById(
      'closeAddProduct'
    ) as HTMLButtonElement;
    let { category, itemName, itemPrice, myfile } = data.value;
    const fd = new FormData();
    fd.append('category', category);
    fd.append('name', itemName);
    fd.append('price', itemPrice);
    fd.append('myfile', this.uploadedFile, myfile);
    console.log(this.uploadedFile);
    this.dashService.addProduct(fd);
    closeElement.click();
    this.toastr.success('Product Added Successfully', 'Add Product');
  }
  //#endregion

  //#endregion

  //#region ========== Deleted Products Tab ==========
  // This method is for getting hidden product(s)
  getRemovedProducts() {
    this.foodService.getProducts().subscribe((data: any) => {
      data.products
        .filter((item: any) => {
          return item.isVisible === false;
        })
        .map((item: any) => {
          this.notVisibleProducts.push(item);
        });
      console.log(this.notVisibleProducts);
    });
  }

  // This method is for recovering a product
  showProduct(id: any) {
    console.log(id);
    this.dashService.showProduct(id).subscribe((data: any) => {
      console.log(data);
      this.toastr.success(data.message, 'Recover Product');
    });
    this.notVisibleProducts = this.notVisibleProducts.filter(
      (item) => item._id !== id
    );
  }

  // This method is for deleting a product permanently
  onDelete(id: any) {
    this.dashService.deleteProduct(id).subscribe((data: any) => {
      console.log(data);
      this.toastr.success(data.message, 'Delete Product');
    });
    this.notVisibleProducts = this.notVisibleProducts.filter(
      (item) => item._id !== id
    );
  }
  //#endregion

  //#region ========== User Methods ==========
  getUsers() {
    let result = '';
    this.user.getUsers().subscribe((data: any) => {
      console.log(data);
      if (data.hasOwnProperty('result')) {
        this.users.push(...data.result);
      } else {
        result = data.message;
        console.log(result);
        this.toastr.error(result, 'Access Users');
      }
    });
  }

  addUser() {
    this.route.navigate(['/signup']);
  }

  // This method is for deleting user permanently. There is no feature for just hiding a user at the current time.
  onRemoveUser(id: any) {
    this.dashService.deleteUser(id).subscribe((data: any) => {
      console.log(data.message);
      const current_users = this.users;
      this.users = current_users.filter((user) => user._id !== id);
      this.toastr.success(data.message, 'Delete User');
    });
  }
  //#endregion
}
