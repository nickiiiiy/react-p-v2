export interface IAddress {
  country: string;
  city: string;
  street: string;
  house: string;
}

export interface IShippingFields {
  phone: string;
  name: string;
  address: IAddress;
}

export interface IOption {
  value: string;
  label: string;
}
