import { Injectable } from '@angular/core';
import { IClientDetails } from './generalObject';

@Injectable()
export class SelectedItemsService {
  whereToEat = '';
  items: any = [];
  clientDentails: Array<IClientDetails> = [];

  invoiceWhere(where: string) {
    this.whereToEat = where;
    console.log('I will eat at:', this.whereToEat);
  }

  invoiceWhereValue() {
    return this.whereToEat;
  }

  invoiceItems(itemSelected: any, total: any) {
    this.items = [];
    this.items.push(...itemSelected);
  }

  invoiceItemsValue() {
    console.log('items from form', this.items);
    return this.items;
  }

  invoiceClientDetails(clientName: any, clientAddress: any, clientPhone: any) {
    this.clientDentails.push({
      name: clientName,
      address: clientAddress,
      phone: clientPhone,
    });
  }
}
