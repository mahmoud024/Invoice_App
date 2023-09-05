import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TotalService {
    private totalValue;

    setTotal(total: number) {
        this.totalValue = total
    }

    getTotal(): number {
        return this.totalValue;
    }
}
