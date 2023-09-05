import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {doc, getDoc, getFirestore, updateDoc} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {ShareddataService} from "../../../../services/shareddata.service";

@Component({
  selector: 'app-slider-update',
  templateUrl: './slider-update.component.html',
  styleUrls: ['./slider-update.component.css']
})
export class SliderUpdateComponent implements OnInit {

  @Input() isSidebarOpen: boolean = true;
  @Input() objectArray: any = {};
    isSaved: boolean = false;
    itemform: any;


    constructor(private route: ActivatedRoute, private formbuilder: FormBuilder, public translate: TranslateService, private routee: Router, private dataService: ShareddataService
    ) {
        this.itemform = this.formbuilder.group({
            items: this.formbuilder.array([]), // Initialize FormArray as empty
        });
  }

  closeSidebar() {
    this.isSidebarOpen = true;
  }

  async UpdateInvoice() {
    const db = getFirestore();
    const docRef = doc(db, 'Cards', this.id);

    try {
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
        isPaid: this.objectArray.isPaid,
          items: this.itemform.value.items,
      });


        console.log('Updated Items:', this.itemform.value.items);
      console.log('Document updated successfully');
        this.routee.navigate(['/updated'])
      this.closeSidebar()

    } catch (error) {
        console.log(error);
    }
  }

    /*************************************************************************************************************/

    /*************************************************************************************************************/

    saved() {
        if (!this.isSaved) { // Add a check to prevent multiple saves
            this.isSaved = true;
            // Save all items to Firestore as an array
            const items = this.items().controls.map((control) => control.value);
        }
    }

    async deleteRow(index: number) {
        const itemsFormArray = this.itemform.get('items') as FormArray;
        itemsFormArray.removeAt(index); // Remove the item from the FormArray

        // Update Firestore with the modified items array
        const updatedItems = itemsFormArray.value;
        const db = getFirestore();
        const docRef = doc(db, 'Cards', this.id);

        try {
            await updateDoc(docRef, {
                items: updatedItems, // Update Firestore with the modified items array
            });
            console.log('Item deleted successfully');
    } catch (error) {
      console.log(error);
    }
    }

    items() {
        return this.itemform.get('items') as FormArray;
  }

    addItem() {
        let newRows = this.formbuilder.group({
            itemName: [''],
            qty: [''],
            price: [''],
            total: ['']
        });

        newRows.get('qty').valueChanges.subscribe(qty => {
            const price = +newRows.get('price').value; // Convert to number
            const totalControl = newRows.get('total') as FormControl;
            const total = price * +qty; // Calculate the total for this item
            totalControl.setValue(total); // Set the total for this item
        });

        newRows.get('price').valueChanges.subscribe(price => {
            const qty = +newRows.get('qty').value; // Convert to number
            const totalControl = newRows.get('total') as FormControl;
            const total = +price * qty; // Calculate the total for this item
            totalControl.setValue(total); // Set the total for this item
        });

        // Push the newRows FormGroup into the FormArray after setting up subscriptions
        this.items().push(newRows);
    }

    /*************************************************************************************************************/
    /*************************************************************************************************************/
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
      this.dataService.sharedData$.subscribe((data) => {
          if (data) {
              this.objectArray = data;
              this.itemform.patchValue({
                  // Update your form controls with the new data as needed
              });
          }
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

          // Update the FormArray with items from Firestore
          const itemsFromFirestore = this.data.items || []; // Ensure it's an array
          const itemsArray = itemsFromFirestore.map((item) =>
              this.formbuilder.group({
                  itemName: [item.itemName],
                  qty: [item.qty],
                  price: [item.price],
                  total: [item.total],
              })
          );

          const itemsFormArray = this.itemform.get('items') as FormArray;
          itemsFormArray.clear(); // Clear existing items before adding new ones
          itemsArray.forEach((itemFormGroup) => {
              itemsFormArray.push(itemFormGroup);

              // Subscribe to value changes for price and qty for each existing item
              itemFormGroup.get('qty').valueChanges.subscribe(() => {
                  this.updateTotalForItem(itemFormGroup); // Recalculate and update the total for this item
              });

              itemFormGroup.get('price').valueChanges.subscribe(() => {
                  this.updateTotalForItem(itemFormGroup); // Recalculate and update the total for this item
              });
          });


      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }

    updateTotalForItem(itemFormGroup: FormGroup) {
        const qty = +itemFormGroup.get('qty').value; // Convert to number
        const price = +itemFormGroup.get('price').value; // Convert to number
        const total = qty * price; // Calculate the total
        itemFormGroup.get('total').setValue(total); // Update the total for this item
    }

  /*************************************************************************************************************/
  /*************************************************************************************************************/
}
