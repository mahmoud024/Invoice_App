import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {User} from "../interfaces/user_Interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    userData: any;

    constructor(private firestore: AngularFirestore, private authService: AuthService) {
    }


    ngOnInit(): void {
        this.authService.getCurrentUserId().subscribe(userId => {
            console.log("User ID:", userId); // Log user ID to check if it's correct
            if (userId) {
                this.authService.getUserData(userId).subscribe(data => {
                    console.log("User Data:", data); // Log user data to check if it's fetched correctly
                    this.userData = data;

                    if (this.userData && this.userData.email) {
                        console.log("User Email:", this.userData.email);
                    } else {
                        console.log('User email not available.');
                    }
                });
            }
        });
    }

}
