import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private fs: AngularFirestore) {
  }

  getAllCard() {
    return this.fs.collection('Cards').snapshotChanges();
  }
}
