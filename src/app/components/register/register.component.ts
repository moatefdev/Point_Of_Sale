import { Component, OnInit } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { IRegisterForm } from 'src/app/shared/generalObject';
import { ToastrService } from 'ngx-toastr';
import { isIdentifier } from '@angular/compiler';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  alertisHidden = true;
  invalidName = '';
  // invalidEmail = '';
  invalidPassword = '';
  invalidSelect = '';
  passwordConstraintsBoxIsHidden = true;
  passwordLengthState = false;
  passwordLettersState = false;
  passwordOneNumberState = false;
  passwordCharsState = false;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private user: UserService
  ) {}

  // registerData: Array<IRegisterForm> = [];

  ngOnInit(): void {
    this.user.checkUserLoggdInAndAuthorized();
  }

  saveSignupData(registerForm: NgForm) {
    const FormControls = registerForm.controls;
    let registerDataValues = registerForm.value;
    // console.log(FormControls);
    console.log(registerDataValues);
    if (
      this.checkRegisterFormValidation(
        event,
        FormControls.name,
        FormControls.username,
        FormControls.password
      ) === true
    ) {
      return;
    }
    if (
      this.passwordLengthState === false ||
      this.passwordLettersState === false ||
      this.passwordOneNumberState === false ||
      this.passwordCharsState === false
    ) {
      event?.preventDefault();
      this.toastr.error('Invalid Password', 'Form Submission', {
        timeOut: 1700,
      });
    } else {
      // ---
      // db.push({
      //   name: registerDataValues.name,
      //   username: registerDataValues.username,
      //   hash: this.generatePasswordHash(registerDataValues.password),
      //   position: registerDataValues.position,
      // });
      // localStorage.setItem(registerDataValues.username, JSON.stringify(db[0]));
      // ----
      this.user.signup(registerDataValues).subscribe((data: any) => {
        console.log(data);
      });
      // console.log(...db);
      this.toastr.success('Done. You can login, now.', 'Form Submission', {
        timeOut: 1700,
      });
      this.toastr.info('Going to Login page.', 'Form Submission', {
        timeOut: 1300,
      });
      // setTimeout(() => {
      //   this.router.navigate(['/login']);
      // }, 3500);
    }
  }
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
    // console.log(pass);
    // console.log(charCode);
    // console.log(hashedPass);
  }

  checkRegisterFormValidation(
    event: Event | undefined,
    name: AbstractControl,
    username: AbstractControl,
    password: AbstractControl
  ): boolean {
    console.log(event);
    if (name.value === '' || username.value === '' || password.value === '') {
      event?.preventDefault();
      this.alertisHidden = false;
      this.invalidName = 'empty';
      // this.invalidEmail = 'empty';
      this.toastr.error("Can't submit an empty form.", 'Form Submission', {
        timeOut: 1700,
      });
      return true;
    } else {
      return false;
    }
  }

  showPasswordConstraintsBox() {
    this.passwordConstraintsBoxIsHidden = !this.passwordConstraintsBoxIsHidden;
  }

  checkPasswordStrength(registerForm: NgForm) {
    const PasswordInputValue = registerForm.controls.password.value;
    // Checking password length
    if (PasswordInputValue.length >= 8) {
      this.passwordLengthState = true;
    } else {
      this.passwordLengthState = false;
    }

    //#region Checking if password value containes Capital and small letters
    let Capital = false;
    let Small = false;
    for (let i = 0; i < PasswordInputValue.length; i++) {
      if (PasswordInputValue[i] == PasswordInputValue[i].toUpperCase()) {
        Capital = true;
      } else if (PasswordInputValue[i] == PasswordInputValue[i].toLowerCase()) {
        Small = true;
      }

      // Check if Capital and Small are equal to true
      if (Capital === true && Small === true) {
        this.passwordLettersState = true;
      } else {
        this.passwordLettersState = false;
      }
    }
    //#endregion

    //#region Checking if password value containes at least one number
    let hasOneNumber = false;
    for (let i = 0; i < PasswordInputValue.length; i++) {
      if (Number.isInteger(parseInt(PasswordInputValue[i]))) {
        hasOneNumber = true;
        break;
      } else {
        hasOneNumber = false;
      }
    }
    // Check if hasOneNumber equals true
    if (hasOneNumber === true) {
      this.passwordOneNumberState = true;
    } else {
      this.passwordOneNumberState = false;
    }
    //#endregion

    //#region Checking if password value containes some characters like _ # ! $
    let hasChars = false;
    for (let i = 0; i < PasswordInputValue.length; i++) {
      switch (PasswordInputValue[i]) {
        case '_':
        case '#':
        case '!':
        case '$':
          hasChars = true;
      }
    }
    // Check if hasChars equals true
    if (hasChars === true) {
      this.passwordCharsState = true;
    } else {
      this.passwordCharsState = false;
    }
    //#endregion
  }
}
