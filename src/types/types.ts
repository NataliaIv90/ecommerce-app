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
  // billingAddressSameAsShipping: boolean;
  // streetBilling: string;
  // countryBilling: ECountrieOptions;
  // cityBilling: string;
  // postalCodeBilling: string;
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
