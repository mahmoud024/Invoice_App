import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>
  userId: string = ''

  constructor(private afauth: AngularFireAuth) {
    this.user = afauth.user;
  }


  signup(email, password) {
    return this.afauth.createUserWithEmailAndPassword(email, password);
  }

  login(email, password) {
    return this.afauth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afauth.signOut();
  }


}
