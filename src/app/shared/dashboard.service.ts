import { ApiConfig } from './apiConfig';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
// };

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  token = this.cookieService.get('access_token');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    }),
  };

  // Add Category
  addCategory(newCategory: string): any {
    console.log(newCategory);
    return this.http
      .post<any>(
        ApiConfig.serverUrl + 'category/addcategory/',
        {
          name: newCategory,
        },
        this.httpOptions
      )
      .subscribe((data) => console.log(data));
  }

  // Remove Category
  removeCategory(id: any) {
    return this.http
      .delete<any>(
        `${ApiConfig.serverUrl}category/deletecategory/${id}`,
        this.httpOptions
      )
      .subscribe((data) => console.log(data));
  }

  // Add Product
  addProduct(newProduct: any) {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${this.token}`);

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: newProduct,
      redirect: 'follow',
    };

    fetch(`${ApiConfig.productRoute}addproduct`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    // return this.http.post<any>(
    //   `${ApiConfig.productRoute}addproduct`,
    //   newProduct,
    //   this.httpOptions
    // );
  }
  updateProduct(id: any, updateProduct: any): any {
    return this.http.patch<any>(
      `${ApiConfig.productRoute}${id}`,
      updateProduct,
      this.httpOptions
    );
  }

  hideProduct(productID: any) {
    const requestOptions: any = {
      method: 'PUT',
      redirect: 'follow',
    };

    fetch(`${ApiConfig.productRoute}${productID}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  // Show product after hide
  showProduct(productId: any) {
    return this.http.patch<any>(
      `${ApiConfig.productRoute}${productId}`,
      {
        isVisible: true,
      },
      this.httpOptions
    );
  }

  deleteProduct(productId: any): any {
    return this.http.delete<any>(
      `${ApiConfig.productRoute}${productId}`,
      this.httpOptions
    );
  }

  // Delete User
  deleteUser(userId: any) {
    return this.http.delete(
      `${ApiConfig.userRoute}deleteuser/${userId}`,
      this.httpOptions
    );
  }
}
