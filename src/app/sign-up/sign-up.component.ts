import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import firebase from "firebase/compat";
import {User} from "../interfaces/user_Interface";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  errorMsg: string = "";

  constructor(private as: AuthService, private us: UserService, private router: Router) {
  }

  Signup(form) {
    let data: User = form.value;
    this.as.signup(data.email, data.password)
      .then(result => {
        this.errorMsg = "";
        this.us.addNewUser(result.user.uid, data.name, data.email).then(() => {
          this.router.navigate(['/'])
        })
      })
      .catch(err => {
        this.errorMsg = err.message;
      })
  }


  inputValue1: string = '';

  isInputInvalid1(): boolean {
    return !this.inputValue1; // Modify this condition based on your validation criteria
  }

  inputValue2: string = '';

  isInputInvalid2(): boolean {
    return !this.inputValue2; // Modify this condition based on your validation criteria
  }

  inputValue3: string = '';

  isInputInvalid3(): boolean {
    return !this.inputValue3; // Modify this condition based on your validation criteria
  }

  inputValue4: string = '';

  isInputInvalid4(): boolean {
    return !this.inputValue4; // Modify this condition based on your validation criteria
  }
}
