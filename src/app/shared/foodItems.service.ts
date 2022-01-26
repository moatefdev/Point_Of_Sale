import { ApiConfig } from './apiConfig';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class FoodItems {
  constructor(private http: HttpClient) {}
  getItemsCategory(): any {
    return this.http.get(ApiConfig.serverUrl + 'category');
  }

  getProducts(): any {
    return this.http.get(ApiConfig.serverUrl + 'products');
  }
}
