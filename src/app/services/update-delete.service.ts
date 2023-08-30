import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateDeleteService {
  private cardData: any;

  setCardData(data: any) {
    this.cardData = data;
  }

  getCardData() {
    return this.cardData;
  }
}
