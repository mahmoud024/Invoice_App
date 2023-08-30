import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CardService} from "../../../services/card.service";
import {InvocesComponent} from "../../invoces.component";
import {Card} from "../../../interfaces/card";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent {
  constructor(private cs: CardService, private ds: InvocesComponent) {
  }

  closeSidebar() {
    this.isSidebarOpen = true;
  }

  @Input() isSidebarOpen: boolean = true;

  selectedValue: string; // This property holds the selected value

  getSelectedValue(event: any) {

    // Prints selected value
    this.selectedValue = event.target.value;
  }

  quantity: number = null;
  price: number = null;
  initialTotal: number = 0;

  calculateTotal(): number {
    return this.quantity * this.price;
  }

  add(x: NgForm) {
    const formattedCurrentDueDate = this.formatCurrentDueDate();
    let data: Card = {
      StreetAddress: x.value.StreetAddress,
      City: x.value.City,
      PostCode: x.value.PostCode,
      Country: x.value.Country,
      ClientName: x.value.ClientName,
      ClientEmail: x.value.ClientEmail,
      ClientStreetAddress: x.value.ClientStreetAddress,
      ClientPostCode: x.value.ClientPostCode,
      ClientCountry: x.value.ClientCountry,
      ClientCity: x.value.ClientCity,
      InvoiceDate: this.formatCurrentDueDate(),
      PaymentTerm: this.selectedValue,
      ProjectDescription: x.value.Description,
      ItemName: x.value.ItemName,
      Qty: x.value.Qty,
      price: x.value.Price,
      Total: this.calculateTotal(),
      isPaid: true,
    }

    console.log(data)
    this.cs.addToCard(data);
  }

  // selectedValued: string = ''; // Add this property and set it to empty string
  clearForm(x: NgForm) {
    x.resetForm(); // Reset the form to its initial state
    this.quantity = null;
    this.price = null;
    this.initialTotal = null;
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

}
