import {Component, Input} from '@angular/core';
import {UpdateDeleteService} from "../../services/update-delete.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input("card") card: any; // Define an input property to receive the card data


  constructor(private sharedDataService: UpdateDeleteService, private router: Router) {
  }

  // Update_Delete_Paid(card) {
  //   console.log(card);
  // }

  goToUpdate(id: string) {
    this.sharedDataService.setCardData(this.card);
    this.router.navigate(['/update', id]);
  }
}
