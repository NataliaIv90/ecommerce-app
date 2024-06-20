import * as Yup from 'yup';
import { ECountrieOptions } from '../../../types/types';

export const addressSchema = Yup.object().shape({
  street: Yup.string().min(1, 'Street should be min 1 character'),
  city: Yup.string()
    .min(1, 'City should be min 1 characters')
    .matches(/^([A-Z][a-z]*)$/g, 'City can only contain latin letters, start from capital letter'),
  country: Yup.string().oneOf([ECountrieOptions.ge, ECountrieOptions.ua, ECountrieOptions.uz]),
  postalCode: Yup.string().when(['country'], (country: ECountrieOptions[], schema) => {
    if (country[0] === ECountrieOptions.ua) {
      return schema.matches(/^\d{5}$/, 'Invalid postal code format for Ukraine');
    } else if (country[0] === ECountrieOptions.uz) {
      return schema.matches(/^\d{6}$/, 'Invalid postal code format for Uzbekistan');
    } else if (country[0] === ECountrieOptions.ge) {
      return schema.matches(/^\d{4}$/, 'Invalid postal code format for Georgia');
    } else {
      return schema;
    }
  }),
});

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().min(5, 'Email should be min 5 symbols').max(50, 'This email is too long'),
  password: Yup.string()
    .test(
      'no-whitespace',
      'Whitespace is not allowed',
      (value: string | undefined) => !/^\s+|\s+$/g.test(value as string)
    )
    .min(8, 'This password is too short, must be at least 8 characters long')
    .max(50, 'This password is too long')
    .matches(/[A-Z]/, 'The password must contain capital letter')
    .matches(/[a-z]/, 'The password must contain a lowercase letter')
    .matches(/\d/, 'The password must contain a digit')
    .matches(/[!%*?&]/, 'Use spec symbols (!,%,*,?,&)'),
  repeatPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Wrong input of confirmation password'),
  firstName: Yup.string()
    .min(1, 'Name should be min 1 characters')
    .max(50, 'This name is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Name can only contain latin letters, start from capital letter'),
  lastName: Yup.string()
    .min(1, 'Surname should be min 2 characters')
    .max(50, 'This surname is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Surname can only contain latin letters,  start from capital letter'),
  dateOfBirth: Yup.date()
    .min(new Date('1900-01-01'), 'Date must be after 1900')
    .max(new Date(new Date().getFullYear() - 13, 11, 31), 'User should be at least 13 years'),

  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  defaultShippingAddress: Yup.boolean(),
  defaultBillingAddress: Yup.boolean(),
  billingAddressSameAsShipping: Yup.boolean(),
});
