import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CardService} from "../../../services/card.service";
import {Card} from "../../../interfaces/card";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {doc, getDoc, getFirestore} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {TotalService} from "../../../services/total.service";
import {TranslateService} from "@ngx-translate/core";
import {ShareddataService} from "../../../services/shareddata.service";


@Component({
  selector: 'app-update-delete',
  templateUrl: './update-delete.component.html',
  styleUrls: ['./update-delete.component.css']
})
export class UpdateDeleteComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private cs: CardService, public translate: TranslateService, private dataService: ShareddataService) {
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

    items: any;
    totale: any;
  async fetchDataFromFirestore() {
    const db = getFirestore();
    const docRef = doc(db, "Cards", this.id); // Use the dynamic ID
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          this.data = docSnap.data();
          this.items = this.data.items;
          console.log('array to send to slider ');
          console.log(this.data);
          this.ispaid = docSnap.get('isPaid');
          // Calculate the total when data is available
          this.totale = this.calculateTotal(this.items);

          // Update the shared data
          this.dataService.updateSharedData(this.data);
      } else {
        console.log("Document does not exist");
      }

    } catch (error) {
      console.log(error);
    }
  }

  /*************************************************************************************************************/

  /*************************************************************************************************************/

    calculateTotal(items: any[]): number {
        let total = 0;

        for (const item of items) {
            total += item.total;
        }

        return total;
    }


  deleteInvoice(id: string) {
    // console.log(id)
    this.cs.deleteInvoice(id);
    this.router.navigate(['/invoices']);
  }

    ispaid: boolean = false; // Initialize to a default value (e.g., false)

  MarkasPaid() {
      if (!this.ispaid) {
          this.ispaid = true; // Change from Draft to Paid
          // Update the isPaid field in Firestore to true
          this.cs.updateIsPaidStatus(this.id, this.ispaid); // Use your CardService to update isPaid status
      }
  }

  isSidebarOpen: boolean = true;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
