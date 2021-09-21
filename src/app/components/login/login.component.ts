import { Component, OnInit } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
// import { IRegisterForm } from 'src/app/shared/generalObject';
// import { db } from './../../shared/registerDB';
import { CURRENT_USER_SESSION } from './../../shared/registerDB';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usernameIsNotValid = false;
  passwordIsNotValid = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loginUser;
  }

  loginUser(loginForm: NgForm) {
    const loginData = loginForm.value;
    console.log(loginForm.controls);
    console.log(loginForm.controls.password.value.length);
    this.checkLoginFormValidation(
      loginForm.controls.username,
      loginForm.controls.password
    );
    for (var i = 0; i < localStorage.length; i++) {
      console.log(localStorage.key(i));
      const usernameVal = JSON.parse(
        localStorage.getItem(loginData.username) ?? ''
      );
      if (
        loginData.username == localStorage.key(i) &&
        this.generatePasswordHash(loginData.password) == usernameVal.hash
      ) {
        if (CURRENT_USER_SESSION.length === 0) {
          /*
            Setting sessionStorage value by getting it from localStorage
            by getting it the username in the login form, whic is
            the key of the local storage data.
          */

          sessionStorage.setItem(
            'current_user',
            String(localStorage.getItem(loginData.username))
          );
          this.router.navigate(['/pos']);
        } else {
          CURRENT_USER_SESSION.clear;
        }
        // console.log(JSON.parse(CURRENT_USER_SESSION));
      }
    }
    console.log(loginForm.value);
  }

  checkLoginFormValidation(
    username: AbstractControl,
    password: AbstractControl
  ) {
    if (username.value === '' && username.touched === true) {
      this.usernameIsNotValid = true;
    }
    if (password.value.length === 0) {
      this.passwordIsNotValid = true;
    }
  }
  // The following function iterates over the local storage keys:

  // The following function iterates over the local storage keys and gets the value set for each key:

  // for(var i =0; i < localStorage.length; i++){
  //     console.log(localStorage.getItem(localStorage.key(i)));
  // }
  generatePasswordHash(pass: string): any {
    // debugger;
    let charCode = [];
    const SECRET_KEY = 1;
    let hashedPass = '';
    for (let i = 0; i < pass.length; i++) {
      charCode.push(pass[i].charCodeAt(0) + SECRET_KEY);
    }
    for (let i = 0; i < charCode.length; i++) {
      hashedPass += String.fromCharCode(charCode[i]);
    }
    return hashedPass;
    console.log(pass);
    console.log(charCode);
    console.log(hashedPass);
  }
}
