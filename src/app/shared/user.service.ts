import { ApiConfig } from './apiConfig';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  userData: any = {};
  token = this.cookieService.get('access_token');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    }),
  };
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: Router
  ) {}

  getUsers(): any {
    return this.http.get<any>(ApiConfig.userRoute, this.httpOptions);
  }

  signup(userSignupData: any): any {
    const userData = {
      fullname: userSignupData.name,
      username: userSignupData.username,
      password: userSignupData.password,
    };
    if (userSignupData.position == 'admin') {
      Object.assign(userData, { admin: true });
    } else {
      Object.assign(userData, { admin: false });
    }
    console.log(userData);

    return this.http.post<any>(
      ApiConfig.userRoute + 'signup',
      userData,
      this.httpOptions
    );
  }

  login(userLoginData: any): any {
    return this.http.post(ApiConfig.userRoute + 'signin', userLoginData);
  }

  isLoggedIn() {
    if (this.cookieService.check('access_token') == false) {
      alert("⚠️ Sorry, you can't access here, until you have logged in.");
      this.route.navigate(['/login']);
    }
  }

  checkUserLoggdInAndAuthorized() {
    if (this.cookieService.check('access_token')) {
      if (window.localStorage.getItem('admin') === 'false') {
        alert(
          '⚠️ Sorry, you are not allowd to access this pages. Only Admins - Operation Prevented 🚫'
        );
        this.route.navigate(['/pos']);
      }
    } else {
      alert("⚠️ Sorry, you can't access here, until you have logged in.");
      this.route.navigate(['/login']);
    }
  }
}
