import { ApiConfig } from './apiConfig';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAllFood, IFoodItems } from './generalObject';

@Injectable()
export class FoodItems {
  constructor(private http: HttpClient) {}
  getItemsCategory(): any {
    return this.http.get(ApiConfig.serverUrl + 'categories');
  }

  getAllFoodItems(): Observable<Array<IAllFood>> {
    return this.http.get<Array<IAllFood>>(ApiConfig.serverUrl + 'items');
  }
}
