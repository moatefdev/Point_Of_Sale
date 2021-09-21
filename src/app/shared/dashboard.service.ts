import { ApiConfig } from './apiConfig';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAllFood, IFoodItems } from './generalObject';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}
  postCategory(category: any): any {
    let categories: any[] = [];
    let newCategories: any[] = [];
    // Getting old categories and pushing new category to newCategories array
    this.http.get(ApiConfig.serverUrl + 'categories').subscribe((data: any) => {
      console.log(typeof data);
      categories.push(...data, category);
    });
    console.log(categories);
    // showing data after pushing to make sure that category added
    this.http.get(ApiConfig.serverUrl + 'categories').subscribe((data: any) => {
      console.log(typeof data);
      newCategories.push(data);
    });
    console.log(newCategories);
    // posting category to the url
    return this.http
      .post<any>(ApiConfig.serverUrl + 'categories', categories, httpOptions)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
