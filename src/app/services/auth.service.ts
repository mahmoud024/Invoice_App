import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Observable} from "rxjs";
import firebase from "firebase/compat";
import {AngularFirestore} from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>
  userId: string = ''

    constructor(private afauth: AngularFireAuth, private firestore: AngularFirestore
    ) {
    this.user = afauth.user;
  }

    getUserData(userId: string): Observable<any> {
        return this.firestore
            .collection('users')
            .doc(userId)
            .valueChanges();
    }

    getCurrentUserId(): Observable<string | null> {
        return this.user.pipe(map(user => (user ? user.uid : null)));
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
