import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CardService} from "../../../services/card.service";
import {Card} from "../../../interfaces/card";
import {UpdateDeleteService} from "../../../services/update-delete.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {doc, getDoc, getFirestore} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;


@Component({
  selector: 'app-update-delete',
  templateUrl: './update-delete.component.html',
  styleUrls: ['./update-delete.component.css']
})
export class UpdateDeleteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private firestore: AngularFirestore, private cs: CardService) {

    // I don't want to use service
    // this.cardData = this.sharedDataService.getCardData();
  }


  // Code for Get Data Using Documents ID From data Base
  /*************************************************************************************************************/
  /*************************************************************************************************************/

  id: string;
  data: DocumentData = [];
  @Input() calculatedTotal: number;

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.fetchDataFromFirestore();
    });
  }

  async fetchDataFromFirestore() {
    const db = getFirestore();
    const docRef = doc(db, "Cards", this.id); // Use the dynamic ID
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.data = docSnap.data(); // Update the component's data
        // console.log("array to send to slider ")
        // console.log(this.data);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*************************************************************************************************************/

  /*************************************************************************************************************/

  deleteInvoice(id: string) {
    // console.log(id)
    this.cs.deleteInvoice(id);
    this.router.navigate(['/invoices']);
  }


  MarkasPaid() {

  }

  isSidebarOpen: boolean = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
