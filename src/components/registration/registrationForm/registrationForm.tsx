import Input from '../../../shared/ui/Input/Input';
import * as Yup from 'yup';
import { ECountrieOptions, IRegisterData, IRegistrationRequestData } from '../../../types/types';
import { useForm, Controller, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { createNewCustomer } from '../../../store/slices/customerSlice';
import { useEffect, useState } from 'react';
import './RegistrationForm.css';
import { FormFooter } from '../formFooter/FormFooter';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';
import { Loader } from '../../../shared/ui/Loader/Loader';

const countriesCodes = {
  Georgia: 'GE',
  Uzbekistan: 'UZ',
  Ukraine: 'UA',
};

const addressSchema = Yup.object().shape({
  street: Yup.string().required('Street is a required field').min(1, 'Street should be min 1 character'),
  city: Yup.string()
    .required('City is required field')
    .min(1, 'City should be min 1 characters')
    .matches(/^([A-Z][a-z]*)$/g, 'City can only contain latin letters, start from capital letter'),
  country: Yup.string()
    .required('Country is a required field')
    .oneOf([ECountrieOptions.ge, ECountrieOptions.ua, ECountrieOptions.uz]),
  postalCode: Yup.string()
    .required('Postal code is required')
    .when(['country'], (country: ECountrieOptions[], schema) => {
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
  email: Yup.string()
    .required('Email is required field')
    .email()
    .min(5, 'Email should be min 5 symbols')
    .max(50, 'This email is too long'),
  password: Yup.string()
    .test(
      'no-whitespace',
      'Whitespace is not allowed',
      (value: string | undefined) => !/^\s+|\s+$/g.test(value as string)
    )
    .required('Password is required field, enter your password.')
    .min(8, 'This password is too short, must be at least 8 characters long')
    .max(50, 'This password is too long')
    .matches(/[A-Z]/, 'The password must contain capital letter')
    .matches(/[a-z]/, 'The password must contain a lowercase letter')
    .matches(/\d/, 'The password must contain a digit')
    .matches(/[!%*?&]/, 'Use spec symbols (!,%,*,?,&)'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Wrong input of confirmation password')
    .required('This field is required'),
  firstName: Yup.string()
    .required('First name is required field')
    .min(1, 'Name should be min 1 characters')
    .max(50, 'This name is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Name can only contain latin letters, start from capital letter'),
  lastName: Yup.string()
    .required('Last name is required field')
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

export const RegistrationForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState(false);
  const customer = useAppSelector((state) => state.customers.customer);

  const onSubmit: SubmitHandler<IRegisterData> = (data: IRegisterData) => {
    if (data.email && data.password && data.firstName && data.dateOfBirth && data.shippingAddress.country) {
      const year = data.dateOfBirth.getFullYear();
      const month = String(data.dateOfBirth.getMonth() + 1).padStart(2, '0');
      const day = String(data.dateOfBirth.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const shippingAddress = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        streetName: data.shippingAddress.street.trim(),
        postalCode: data.shippingAddress.postalCode,
        city: data.shippingAddress.city,
        country: countriesCodes[data.shippingAddress.country],
      };

      let billingAddress;
      if (data.billingAddressSameAsShipping) {
        billingAddress = shippingAddress;
      } else {
        billingAddress = {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          streetName: data.billingAddress.street.trim(),
          postalCode: data.billingAddress.postalCode,
          city: data.billingAddress.city,
          country: countriesCodes[data.billingAddress.country],
        };
      }

      const requestData: IRegistrationRequestData = {
        email: data.email,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        password: data.password,
        dateOfBirth: formattedDate,
        addresses: [shippingAddress, billingAddress],
        shippingAddresses: [0],
        billingAddresses: [1],
        defaultShippingAddress: data.defaultShippingAddress ? 0 : undefined,
        defaultBillingAddress: data.defaultBillingAddress ? 1 : undefined,
      };

      setLoading(true);
      void dispatch(createNewCustomer({ requestData, setLoading })).then((response) => {
        if (createNewCustomer.fulfilled.match(response)) {
          const customerData = response.payload.customer;
          if (customerData) {
            navigate('/');
          }
          if (response.payload.errorMassage === 'There is already an existing customer with the provided email.') {
            setRequestError(true);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (customer && Object.keys(customer).length) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [customer]);

  const { control, handleSubmit, watch, setValue } = useForm<IRegisterData>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      dateOfBirth: new Date('1900-01-01'),
      defaultShippingAddress: false,
      defaultBillingAddress: false,
      billingAddressSameAsShipping: false,
      shippingAddress: {
        city: '',
        country: ECountrieOptions.ge,
        postalCode: '',
        street: '',
      },
      billingAddress: {
        city: '',
        country: ECountrieOptions.ge,
        postalCode: '',
        street: '',
      },
    },
    resolver: yupResolver(validationSchema) as Resolver<IRegisterData>,
    mode: 'all',
  });

  const shippingAddress = watch('shippingAddress');
  const billingAddressSameAsShipping = watch('billingAddressSameAsShipping');

  useEffect(() => {
    if (billingAddressSameAsShipping) {
      setValue('billingAddress.country', shippingAddress.country);
      setValue('billingAddress.street', shippingAddress.street);
      setValue('billingAddress.city', shippingAddress.city);
      setValue('billingAddress.postalCode', shippingAddress.postalCode);
    }
  }, [
    billingAddressSameAsShipping,
    setValue,
    shippingAddress.city,
    shippingAddress.country,
    shippingAddress.postalCode,
    shippingAddress.street,
  ]);

  return (
    <div>
      <form
        className='registration-form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='email'
              placeholder='Enter your email'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={
                requestError
                  ? 'An account with the provided email address already exists. Please log in using your existing account or use a different email address to create a new account.'
                  : fieldState.error?.message
              }
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <Input
              type='password'
              id='password'
              placeholder='Enter your password'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='repeatPassword'
          render={({ field, fieldState }) => (
            <Input
              type='password'
              id='repeatPassword'
              placeholder='Enter password one more time'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='firstName'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='firstName'
              placeholder='Enter your first name'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='lastName'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='lastName'
              placeholder='Enter your last name'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='dateOfBirth'
          render={({ field, fieldState }) => (
            <Input
              type='date'
              id='dateOfBirth'
              placeholder='Enter your date of birth'
              value={field.value instanceof Date ? field.value.toISOString().substr(0, 10) : field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <h3 className='form-subtitle'>Shipping address information</h3>
        <div className='divider'></div>

        <Controller
          control={control}
          name='shippingAddress.country'
          render={({ field, fieldState }) => (
            <>
              <select
                {...field}
                name='shippingAddressCountry'
                className='registration__select-input'
                title='Shipping country'
              >
                {Object.entries(ECountrieOptions).map(([key, value]) => (
                  <option
                    key={key}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>

              {fieldState.error && <p className={fieldState.error ? 'error' : ''}>{fieldState.error.message}</p>}
            </>
          )}
        />

        <Controller
          control={control}
          name='shippingAddress.street'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='street'
              placeholder='Enter your street'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='shippingAddress.city'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='city'
              placeholder='Enter your city'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='shippingAddress.postalCode'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='postalCode'
              placeholder='Enter your postal code'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='defaultShippingAddress'
          render={({ field, fieldState }) => (
            <>
              <div className='registration__checkbox-wrapper'>
                <input
                  type='checkbox'
                  id='defaultShippingAddress'
                  checked={field.value}
                  onChange={field.onChange}
                  className={fieldState.error ? 'errorInput' : ''}
                />

                <label htmlFor='defaultShippingAddress'>Set as default shipping address</label>
              </div>
              {fieldState.error && <p className={fieldState.error ? 'error' : ''}>{fieldState.error.message}</p>}
            </>
          )}
        />

        <Controller
          control={control}
          name='billingAddressSameAsShipping'
          render={({ field, fieldState }) => (
            <>
              <div className='registration__checkbox-wrapper'>
                <input
                  type='checkbox'
                  id='billingAddressSameAsShipping'
                  checked={field.value}
                  onChange={field.onChange}
                  className={fieldState.error ? 'errorInput' : ''}
                />

                <label htmlFor='billingAddressSameAsShipping'>Set the same address for billing</label>
              </div>
              {fieldState.error && <p className={fieldState.error ? 'error' : ''}>{fieldState.error.message}</p>}
            </>
          )}
        />

        <h3 className='form-subtitle'>Billing address information</h3>
        {billingAddressSameAsShipping ? (
          <p className='error'>*Disabled for input. Shipping and billing adresses are equal.</p>
        ) : null}

        <div className='divider'></div>

        <Controller
          control={control}
          name='billingAddress.country'
          render={({ field, fieldState }) => (
            <>
              <select
                {...field}
                name='billingAddressCountry'
                className='registration__select-input'
                disabled={billingAddressSameAsShipping}
                title='Billing address country'
              >
                {Object.entries(ECountrieOptions).map(([key, value]) => (
                  <option
                    key={key}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>

              {fieldState.error && <p className={fieldState.error ? 'error' : ''}>{fieldState.error.message}</p>}
            </>
          )}
        />

        <Controller
          control={control}
          name='billingAddress.street'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='streetBilling'
              placeholder='Enter your street'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              disabled={billingAddressSameAsShipping}
            />
          )}
        />

        <Controller
          control={control}
          name='billingAddress.city'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='cityBilling'
              placeholder='Enter your city'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              disabled={billingAddressSameAsShipping}
            />
          )}
        />

        <Controller
          control={control}
          name='billingAddress.postalCode'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='postalCodeBilling'
              placeholder='Enter your postal code'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              disabled={billingAddressSameAsShipping}
            />
          )}
        />

        <Controller
          control={control}
          name='defaultBillingAddress'
          render={({ field, fieldState }) => (
            <>
              <div className='registration__checkbox-wrapper'>
                <input
                  type='checkbox'
                  id='defaultBillingAddress'
                  checked={field.value}
                  onChange={field.onChange}
                  className={fieldState.error ? 'errorInput' : ''}
                />

                <label htmlFor='defaultBillingAddress'>Set as default billing address</label>
              </div>
              {fieldState.error && <p className={fieldState.error ? 'error' : ''}>{fieldState.error.message}</p>}
            </>
          )}
        />

        <OutlinedButton
          wideBtn={true}
          type='submit'
          text='Submit'
        />
        <FormFooter />
      </form>
      <Loader isLoading={isLoading} />
    </div>
  );
};
