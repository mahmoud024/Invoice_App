import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {user} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: AngularFirestore) {
  }


  addNewUser(id, name, email) {
    return this.fs.doc('users/' + id).set({
      name: name,
      email: email
    })
  }

}
