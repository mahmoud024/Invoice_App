import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ShareddataService {

    private sharedData = new BehaviorSubject<any>(null);
    sharedData$ = this.sharedData.asObservable();

    updateSharedData(data: any) {
        this.sharedData.next(data);
    }
}
