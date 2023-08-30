import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMsg: string = "";


  constructor(private as: AuthService, private router: Router) {
  } //injectable service


  Login(form) {
    let data = form.value
    this.as.login(data.email, data.password).then(
      result => {
        this.router.navigate(['/invoices'])
        console.log(result)
      }).catch(err => {
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


}
