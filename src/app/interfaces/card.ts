export interface Card {
  id?: string,
  StreetAddress?: string,
  City?: string,
  PostCode?: string,
  Country?: string,
  ClientName?: string,
  ClientEmail?: string,
  ClientStreetAddress?: string,
  ClientPostCode?: string,
  ClientCountry?: string,
  ClientCity?: string,
  InvoiceDate?: string,
  PaymentTerm?: string,
  ProjectDescription?: string,
  isPaid?: boolean,
    items?: {
        itemName: string;
        qty: number;
        price: number;
        total: number;
    }[];
}
