import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TotalService} from "../../services/total.service";
import {TranslateService} from "@ngx-translate/core";
import {FilterService} from "../../services/filter.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})


export class CardsComponent implements OnInit {

    @Input("card") card: any; // Define an input property to receive the card data
    // currentFilter: string = ''; // Initialize with an empty filter
    // filteredCards: any[] = [];


    constructor(private router: Router, private filterService: FilterService, public translate: TranslateService) {

        // this.currentFilter = this.filterService.getFilter(); // Move the statement to the constructor
        // this.filteredCards = this.filterCards(this.currentFilter);
        // this.sortCardsByIsPaid();
    }

    ngOnInit() {
        console.log(this.card.isPaid)
        // booleanArray.push(this.card.isPaid);

        // booleanArray.sort((a, b) => (a === b ? 0 : a ? -1 : 1));
        //
        // console.log(booleanArray);
    }

    // private filterCards(currentFilter: string): any[] {
    //     if (currentFilter === 'draft') {
    //         return this.card.filter((card) => card.isPaid === false);
    //     } else if (currentFilter === 'paid') {
    //         return this.card.filter((card) => card.isPaid === true);
    //     } else {
    //         return this.card; // Return the original array if no filter is applied
    //     }
    // }
    //
    //   sortCardsByIsPaid() {
    //       this.filteredCards.sort((a, b) => {
    //           if (a.isPaid && !b.isPaid) {
    //               return 1;
    //           } else if (!a.isPaid && b.isPaid) {
    //               return -1;
    //           } else {
    //               return 0;
    //           }
    //       });
    //   }


    calculateTotal(items: any[]): number {
        let total = 0;
        for (const item of items) {
            total += item.total;
        }
        return total;
    }
  goToUpdate(id: string) {
      // this.sharedDataService.setCardData(this.card);
    this.router.navigate(['/update', id]);
  }
}

