import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TranslateService} from "@ngx-translate/core";
import {FilterService} from "../../services/filter.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    constructor(private firestore: AngularFirestore, public translate: TranslateService, private filterService: FilterService) {
        this.getDocumentCount();
    }

  isSidebarOpen: boolean = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


    selectedFilter: string = ''; // Initialize with an empty filter
    onFilterChange() {
        this.filterService.setFilter(this.selectedFilter);
        console.log("selected is = ", this.selectedFilter)

    }

    ngOnInit() {
    }


  // Counter Cards
  documentCount$: Observable<number>;

  getDocumentCount() {
    const collectionRef = this.firestore.collection('Cards'); // Replace with your collection name

    this.documentCount$ = collectionRef.valueChanges().pipe(
      map(docs => docs.length)
    );
  }

}
