import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {
  constructor(private as: AuthService, private router: Router) {
  }

  logoutt() {
    this.as.logout().then(() => {
        console.log("out");
        this.router.navigate(['/login'])
      }
    )
  }


}
