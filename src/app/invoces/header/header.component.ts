import {Component, EventEmitter, Output} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {


  isSidebarOpen: boolean = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  // Counter Cards
  documentCount$: Observable<number>;

  constructor(private firestore: AngularFirestore) {
    this.getDocumentCount();
  }

  getDocumentCount() {
    const collectionRef = this.firestore.collection('Cards'); // Replace with your collection name

    this.documentCount$ = collectionRef.valueChanges().pipe(
      map(docs => docs.length)
    );
  }

}
