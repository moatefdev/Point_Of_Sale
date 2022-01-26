import { Component, OnInit } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usernameIsNotValid = false;
  passwordIsNotValid = false;
  constructor(
    private router: Router,
    private user: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loginUser;
  }

  loginUser(loginForm: NgForm) {
    const username = loginForm.controls.username;
    const password = loginForm.controls.password;

    // 1 - Check the validation of login fields
    this.checkLoginFormValidation(username, password);

    // 2 - after check validation and login fields are definitely valid
    if (this.usernameIsNotValid == false && this.passwordIsNotValid == false) {
      this.user.login(loginForm.value).subscribe((data: any) => {
        console.log(this.user.userData);
        console.log(data.user);
        /*
         * I am assigning `this.user.userData` with `...data.user`
         * to set the fullname and admin value in localStorage
         * and I can not depend on one of them (assigned values - first line in this comment (42))
         * becuase `this.user.userData will be empty because it only filled with data when sigining up for the first time`
         */
        const returnedObj = Object.assign(this.user.userData, ...data.user);
        localStorage.setItem('fullname', returnedObj.fullname);
        localStorage.setItem('admin', returnedObj.admin);
        console.log(returnedObj);
        console.log(this.user.userData);
        // 2.1 Set token in a cookie
        this.cookieService.set('access_token', data.token);
        this.router.navigate(['/pos']);
      });
    }
  }

  // Check login form validation
  checkLoginFormValidation(
    username: AbstractControl,
    password: AbstractControl
  ) {
    if (username.value === '' && username.touched === true) {
      this.usernameIsNotValid = true;
    }
    if (password.value.length === 0 && username.touched === true) {
      this.passwordIsNotValid = true;
    }
  }
}
