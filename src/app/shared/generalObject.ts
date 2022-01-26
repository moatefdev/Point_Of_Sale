export interface IFoodItems {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemImg?: string;
}

export interface ISelectedItems {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemQty: number;
  isSelected: boolean;
}

export interface IInvoiceItems {
  itemName: string;
  itemPrice: number;
  qty: number;
}

export interface IRegisterForm {
  name: string;
  username: string;
  password: string | number;
  position: string;
}

export interface IClientDetails {
  name: string;
  address: string;
  phone: number;
}
