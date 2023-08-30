import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {doc, getDoc, getFirestore, updateDoc} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-slider-update',
  templateUrl: './slider-update.component.html',
  styleUrls: ['./slider-update.component.css']
})
export class SliderUpdateComponent {

  @Input() isSidebarOpen: boolean = true;
  @Input() objectArray: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  closeSidebar() {
    this.isSidebarOpen = true;
  }

  calculateTotal(price, Qty) {
    return price * Qty
  }

  async UpdateInvoice() {
    const db = getFirestore();
    const docRef = doc(db, 'Cards', this.id);
    try {
      // console.log("objectArray is = ");
      // console.log(this.objectArray);
      // Update the document with the new data from form inputs
      await updateDoc(docRef, {
        StreetAddress: this.objectArray.StreetAddress,
        City: this.objectArray.City,
        PostCode: this.objectArray.PostCode,
        Country: this.objectArray.Country,
        ClientName: this.objectArray.ClientName,
        ClientEmail: this.objectArray.ClientEmail,
        ClientStreetAddress: this.objectArray.ClientStreetAddress,
        ClientPostCode: this.objectArray.ClientPostCode,
        ClientCountry: this.objectArray.ClientCountry,
        ClientCity: this.objectArray.ClientCity,
        InvoiceDate: this.objectArray.InvoiceDate,
        PaymentTerm: this.objectArray.PaymentTerm,
        ProjectDescription: this.objectArray.ProjectDescription,
        ItemName: this.objectArray.ItemName,
        Qty: this.objectArray.Qty,
        price: this.objectArray.price,
        Total: this.calculateTotal(this.objectArray.price, this.objectArray.Qty),
        isPaid: this.objectArray.isPaid,
      });
      console.log('Document updated successfully');
      this.closeSidebar()
    } catch (error) {
      console.log(error);
    }

  }


  // Code for Get Data Using Documents ID From data Base
  /*************************************************************************************************************/
  /*************************************************************************************************************/
  id: string;
  data: DocumentData = [];

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
        console.log(this.data);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*************************************************************************************************************/
  /*************************************************************************************************************/


}
