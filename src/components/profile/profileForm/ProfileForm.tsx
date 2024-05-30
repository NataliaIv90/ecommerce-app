import Input from '../../../shared/ui/Input/Input';
import { ECountrieOptions, IRegisterData } from '../../../types/types';
import { useForm, Controller, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { UpdateCustomer } from '../../../store/slices/customerSlice';
import { useState } from 'react';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';
import { Loader } from '../../../shared/ui/Loader/Loader';

import './ProfileForm.css';
import { validationSchema } from '../validation/validation';
import { getBillinggAddresses, getShippingAddresses, isDefault } from '../helpers/helpers';
import { Address } from '@commercetools/platform-sdk';

interface IProfileFormProps {
  selectedItem: string;
}

export const ProfileForm = ({ selectedItem }: IProfileFormProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.customers.customer);
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IRegisterData> = (data: IRegisterData) => {
    const year = data.dateOfBirth.getFullYear();
    const month = String(data.dateOfBirth.getMonth() + 1).padStart(2, '0');
    const day = String(data.dateOfBirth.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    if (
      data.email ||
      data.password ||
      data.firstName.trim() !== customer?.firstName ||
      data.lastName.trim() !== customer?.lastName ||
      formattedDate !== customer?.dateOfBirth ||
      data.shippingAddress.country
    ) {
      const customerId = customer?.id || '';

      const updatedFields = {
        setFirstName: { firstName: data.firstName.trim() },
        setLastName: { lastName: data.lastName.trim() },
        setDateOfBirth: { dateOfBirth: formattedDate },
      };

      setLoading(true);
      void dispatch(UpdateCustomer({ customerId, updatedFields })).then((response) => {
        if (UpdateCustomer.fulfilled.match(response)) {
          const customerData = response.payload;
          if (customerData) {
            alert('Profile Successfully updated!');
          }
          setLoading(false);
        }
      });
    }
  };

  const shippingAddresses: Address[] | null = getShippingAddresses(customer);
  const billingAddresses: Address[] | null = getBillinggAddresses(customer);

  const shippingAddress = {
    city: '',
    country: ECountrieOptions.ge,
    postalCode: '',
    street: '',
  };

  let billingAddress = {
    city: '',
    country: ECountrieOptions.ge,
    postalCode: '',
    street: '',
  };

  if (customer?.addresses && customer?.addresses.length === 2) {
    const sAddress = customer.addresses[0];
    const bAddress = customer.addresses[1];

    shippingAddress.city = sAddress.city || '';
    shippingAddress.postalCode = sAddress.postalCode || '';
    shippingAddress.street = sAddress.streetName || '';

    billingAddress.city = bAddress.city || '';
    billingAddress.postalCode = bAddress.postalCode || '';
    billingAddress.street = bAddress.streetName || '';
  }
  if (customer?.addresses && customer?.addresses.length === 1) {
    const address = customer.addresses[0];
    shippingAddress.city = address.city || '';
    shippingAddress.postalCode = address.postalCode || '';
    shippingAddress.street = address.streetName || '';
    billingAddress = shippingAddress;
  }

  const { control, handleSubmit } = useForm<IRegisterData>({
    defaultValues: {
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      dateOfBirth: new Date(customer?.dateOfBirth || '1900-01-01'),
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
    },
    resolver: yupResolver(validationSchema) as Resolver<IRegisterData>,
    mode: 'all',
  });

  return (
    <div>
      <form
        className='profile-form'
        onSubmit={handleSubmit(onSubmit)}
      >
        {selectedItem === 'personal_info' ? (
          <>
            <label htmlFor='firstName'>First Name: </label>
            <Controller
              control={control}
              name='firstName'
              render={({ field, fieldState }) => (
                <Input
                  name='firstName'
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

            <br />

            <label htmlFor='lastName'>Last Name: </label>
            <Controller
              control={control}
              name='lastName'
              render={({ field, fieldState }) => (
                <Input
                  name='lastName'
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

            <br />

            <label htmlFor='dateOfBirth'>Date of birth: </label>

            <Controller
              control={control}
              name='dateOfBirth'
              render={({ field, fieldState }) => (
                <Input
                  name='dateOfBirth'
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
          </>
        ) : null}

        <br />

        {selectedItem === 'addresses' ? (
          <>
            <h2>Shipping addresses</h2>
            <br />
            {shippingAddresses?.map((address) => {
              const isDefaultShippingAddress = isDefault(address, customer?.defaultShippingAddressId);
              return (
                <div
                  key={address.id}
                  className={'address-container' + (isDefaultShippingAddress ? ' default' : '')}
                >
                  {isDefaultShippingAddress ? <h3>Default Shipping Address</h3> : null}
                  <br />
                  <label
                    className='country-label'
                    htmlFor='shippingAddressCountry'
                  >
                    Country:{' '}
                  </label>
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

                        {fieldState.error && (
                          <p className={fieldState.error ? 'error' : ''}>{fieldState.error.message}</p>
                        )}
                      </>
                    )}
                  />

                  <br />

                  <label htmlFor='shippingAddress.street'>Street: </label>
                  <Controller
                    control={control}
                    name='shippingAddress.street'
                    render={({ field, fieldState }) => (
                      <Input
                        name='shippingAddress.street'
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

                  <br />

                  <label htmlFor='shippingAddress.city'>City: </label>
                  <Controller
                    control={control}
                    name='shippingAddress.city'
                    render={({ field, fieldState }) => (
                      <Input
                        name='shippingAddress.city'
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

                  <br />

                  <label htmlFor='shippingAddress.postalCode'>Postal Code: </label>
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

                  <button className='delete-address'>X</button>
                </div>
              );
            })}

            <button className='add-new-address'>Add Shipping Address</button>

            <br />

            <h2>Billing addresses</h2>

            <br />

            {billingAddresses?.map((address) => {
              const isDefaultBillingAddress = isDefault(address, customer?.defaultShippingAddressId);

              return (
                <div
                  key={address.id}
                  className={'address-container' + (isDefaultBillingAddress ? ' default' : '')}
                >
                  {isDefaultBillingAddress ? <h3>Default Billing Address</h3> : null}
                  <br />
                  <label
                    className='country-label'
                    htmlFor='billingAddressCountry'
                  >
                    Country:{' '}
                  </label>
                  <Controller
                    control={control}
                    name='billingAddress.country'
                    render={({ field, fieldState }) => (
                      <>
                        <select
                          {...field}
                          name='billingAddressCountry'
                          className='registration__select-input'
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

                        {fieldState.error && (
                          <p className={fieldState.error ? 'error' : ''}>{fieldState.error.message}</p>
                        )}
                      </>
                    )}
                  />

                  <br />
                  <label htmlFor='billingAddress.street'>Street: </label>
                  <Controller
                    control={control}
                    name='billingAddress.street'
                    render={({ field, fieldState }) => (
                      <Input
                        name='billingAddress.street'
                        type='text'
                        id='streetBilling'
                        placeholder='Enter your street'
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error?.message}
                      />
                    )}
                  />

                  <br />
                  <label htmlFor='billingAddress.city'>City: </label>
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
                      />
                    )}
                  />

                  <br />
                  <label htmlFor='billingAddress.postalCode'>Postal Code: </label>
                  <Controller
                    control={control}
                    name='billingAddress.postalCode'
                    render={({ field, fieldState }) => (
                      <Input
                        name='billingAddress.postalCode'
                        type='text'
                        id='postalCodeBilling'
                        placeholder='Enter your postal code'
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error?.message}
                      />
                    )}
                  />

                  <button className='delete-address'>X</button>
                </div>
              );
            })}
            <button className='add-new-address'>Add Billing Address</button>
          </>
        ) : null}

        <br />
        <OutlinedButton
          wideBtn={false}
          type='submit'
          text='Save'
        />
      </form>
      <Loader isLoading={isLoading} />
    </div>
  );
};
