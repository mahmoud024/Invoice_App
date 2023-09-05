import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-updated',
    templateUrl: './updated.component.html',
    styleUrls: ['./updated.component.css']
})
export class UpdatedComponent {
    constructor(private routee: Router) {
    }

    goToUpdate() {
        this.routee.navigate(['/invoices'])

    }
}
