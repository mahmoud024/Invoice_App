import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {user} from "@angular/fire/auth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: AngularFirestore) {
  }


    addNewUser(id, name, email, password, ids) {
    return this.fs.doc('users/' + id).set({
      name: name,
        email: email,
        password: password,
        ids: ids
    })
  }


}
