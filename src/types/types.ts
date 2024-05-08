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
  street: string;
  country: ECountrieOptions;
  city: string;
  postalCode: string;
}
