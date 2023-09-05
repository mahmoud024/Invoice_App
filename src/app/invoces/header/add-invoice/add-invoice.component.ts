import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {CardService} from "../../../services/card.service";
import {InvocesComponent} from "../../invoces.component";
import {Card} from "../../../interfaces/card";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {Item} from "../../../interfaces/item";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {


  @Input() isSidebarOpen: boolean = true;
  selectedValue: string = ''; // Default value
  invoiceForm: FormGroup;
  isSaved: boolean = false;
  isButtonDisabled = false;
  itemform: any;

  onPaymentTermChange(event: any) {
    this.selectedValue = event.target.value;
  }

  constructor(private cs: CardService, private formbuilder: FormBuilder, private firestore: AngularFirestore, public translate: TranslateService) {
    // this.total = this.calculateTotal();
    this.itemform = this.formbuilder.group({
      items: this.formbuilder.array([])
    })

  }

  /********************************************************************************/
  ngOnInit(): void {
    this.invoiceForm = this.formbuilder.group({
      StreetAddress: [''],
      City: ['', Validators.required],
      PostCode: ['', Validators.required],
      Country: ['', Validators.required],
      ClientName: ['', Validators.required],
      ClientEmail: ['', Validators.required],
      ClientStreetAddress: ['', Validators.required],
      ClientPostCode: ['', Validators.required],
      ClientCountry: ['', Validators.required],
      ClientCity: ['', Validators.required],
      InvoiceDate: [new Date().toISOString(), Validators.required], // Initialize with a default date
      PaymentTerm: [this.selectedValue, Validators.required], // Default value
      Description: ['', Validators.required],
      // Define other form controls with their initial values and validators here
    });
  }

  saved() {
    if (!this.isSaved) {
      this.isSaved = true;
      this.isButtonDisabled = true;

      const items = this.items().controls.map((control) => control.value);
    }
    // this.closeSidebar();

  }

  /********************************************************************************/

  add() {
    const formattedCurrentDueDate = this.formatCurrentDueDate();

    // Create an array to store the items
    const items = [];

    // Loop through the items in your FormArray and add them to the items array
    const formItems = this.itemform.get('items') as FormArray;
    formItems.controls.forEach((control) => {
      items.push({
        itemName: control.get('itemName').value,
        qty: control.get('qty').value,
        price: control.get('price').value,
        total: control.get('total').value,
      });
    });
    const formData = this.invoiceForm.value;

    // Add debugging statements
    console.log('FormData:', formData);
    console.log('SelectedValue:', this.selectedValue);

    let data: Card = {
      StreetAddress: formData.StreetAddress,
      City: formData.City,
      PostCode: formData.PostCode,
      Country: formData.Country,
      ClientName: formData.ClientName,
      ClientEmail: formData.ClientEmail,
      ClientStreetAddress: formData.ClientStreetAddress,
      ClientPostCode: formData.ClientPostCode,
      ClientCountry: formData.ClientCountry,
      ClientCity: formData.ClientCity,
      InvoiceDate: this.formatCurrentDueDate(),
      PaymentTerm: this.selectedValue,
      ProjectDescription: formData.Description,
      isPaid: false,
      items: items, // Add the items array to the data object
    };

    console.log('Data:', data);
    this.cs.addToCard(data).then(() => {
      this.closeSidebar();
    })
  }

  clearForm() {
    this.invoiceForm.reset();
    const items = this.itemform.get('items') as FormArray;
    items.clear(); // This will remove all items from the FormArray
    this.selectedValue = ''; // Reset the selected value for Payment Terms
  }

  formatCurrentDueDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const monthName = monthNames[monthIndex];

    return `Due ${day} ${monthName} ${year}`;
  }

  deleteRow(i: any) {
    this.items().removeAt(i);
    console.log(i);
  }

  closeSidebar() {
    this.isSidebarOpen = true;
  }

  addItem() {
    let newRows = this.formbuilder.group({
      itemName: [''],
      qty: [''],
      price: [''],
      total: ['']
    });

    // Subscribe to value changes of qty and price controls
    newRows.get('qty').valueChanges.subscribe(qty => {
      const price = +newRows.get('price').value; // Convert to number
      const totalControl = newRows.get('total') as FormControl;
      totalControl.setValue(price * +qty); // Calculate and set the total
    });

    newRows.get('price').valueChanges.subscribe(price => {
      const qty = +newRows.get('qty').value; // Convert to number
      const totalControl = newRows.get('total') as FormControl;
      totalControl.setValue(+price * qty); // Calculate and set the total
    });

    // Push the newRows FormGroup into the FormArray after setting up subscriptions
    this.items().push(newRows);
  }

  items(): FormArray {
    return this.itemform.get('items') as FormArray;
  }


}
