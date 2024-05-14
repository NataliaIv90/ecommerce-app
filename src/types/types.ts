/* eslint-disable no-unused-vars */
export enum ECountrieOptions {
  ua = 'Ukraine',
  ge = 'Georgia',
  uz = 'Uzbekistan',
}

export interface IRegisterData {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  // street: string;
  // country: ECountrieOptions;
  // city: string;
  // postalCode: string;
  defaultShippingAddress: boolean;
  defaultBillingAddress: boolean;
  shippingAddress: TAddress;
  billingAddress: TAddress;
  billingAddressSameAsShipping: boolean;
}

export type TAddress = {
  street: string;
  country: ECountrieOptions;
  city: string;
  postalCode: string;
};

export interface TAddressRequest {
  streetName: string;
  country: string;
  city: string;
  postalCode: string;
  firstName: string;
  lastName: string;
}

export interface IRegistrationRequestData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: TAddressRequest[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}
