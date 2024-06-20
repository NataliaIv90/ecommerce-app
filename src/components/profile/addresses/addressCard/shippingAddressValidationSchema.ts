import * as Yup from 'yup';
import { ECountrieOptions } from '../../../../types/types';

const addressSchema = Yup.object().shape({
  streetName: Yup.string().min(1, 'Street should be min 1 character'),
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

const validationSchema = Yup.object().shape({
  shippingAddress: addressSchema,
});

export default validationSchema;
