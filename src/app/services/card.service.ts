import {Injectable} from '@angular/core';
import {Card} from "../interfaces/card";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {InvocesComponent} from "../invoces/invoces.component";
import {CardsService} from "./cards.service";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private fs: AngularFirestore, private as: AuthService) {
  }


  addToCard(data: Card) {
    return this.fs.collection("Cards").add(data);
  }

  getData() {
    return this.fs.collection('Cards').snapshotChanges();
  }

    updateIsPaidStatus(id: string, isPaid: boolean) {
        return this.fs.collection('Cards').doc(id).update({isPaid: isPaid});
    }


  deleteInvoice(id: string) {
    return this.fs.collection(`Cards`).doc(id).delete();
  }


}
