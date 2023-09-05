import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    private f = ''; // Initialize with an empty string

    // Define a getter for the filter
    getFilter(): string {
        return this.f;
    }

    // Define a setter for the filter
    setFilter(filter: string) {
        this.f = filter; // Set the filter to the new value
    }
}
