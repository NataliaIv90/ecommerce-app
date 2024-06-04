import { Customer } from '@commercetools/platform-sdk';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { ECountrieOptions } from '../../../../types/types';
import validationSchema from '../addressCard/shippingAddressValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { OutlinedButton } from '../../../../shared/button/outlinedButton/OutlinedButton';
import Input from '../../../../shared/ui/Input/Input';
import { setLoading } from '../../../../store/slices/productSlice';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { UpdateCustomer } from '../../../../store/slices/customerSlice';

interface IAddShippingAddress {
  shippingAddress: IEditShippingAddress;
}

interface IEditShippingAddress {
  streetName: string | undefined;
  country: ECountrieOptions | undefined;
  city: string | undefined;
  postalCode: string | undefined;
}

type CountryCode = 'GE' | 'UZ' | 'UA';

const countriesCodes: Record<string, CountryCode> = {
  Georgia: 'GE',
  Uzbekistan: 'UZ',
  Ukraine: 'UA',
};

const AddShippingAddress = ({
  customer,
  handleShowTogle,
  handleEditToggle,
}: {
  customer: Customer;
  handleShowTogle: () => void;
  handleEditToggle: () => void;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<IAddShippingAddress>({
    defaultValues: {
      shippingAddress: {
        city: '',
        country: ECountrieOptions.ge,
        postalCode: '',
        streetName: '',
      },
    },
    resolver: yupResolver(validationSchema) as Resolver<IAddShippingAddress>,
    mode: 'all',
  });

  const onSubmit = (data: IAddShippingAddress) => {
    if (
      data.shippingAddress.city &&
      data.shippingAddress.country &&
      data.shippingAddress.postalCode &&
      data.shippingAddress.streetName
    ) {
      const customerId = customer?.id || '';

      const shippingAddress = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        streetName: data.shippingAddress.streetName.trim(),
        postalCode: data.shippingAddress.postalCode.trim(),
        city: data.shippingAddress.city.trim(),
        country: countriesCodes[data.shippingAddress.country],
      };

      const updatedFields = {
        addShippingAddress: { address: shippingAddress },
      };

      setLoading(true);
      void dispatch(UpdateCustomer({ customerId, updatedFields })).then((response) => {
        if (UpdateCustomer.fulfilled.match(response)) {
          const customerData = response.payload;
          if (customerData) {
            const address = customerData.addresses[customerData.addresses.length - 1];

            const updatedFields = {
              addShippingAddressId: { addressId: address.id },
            };

            void dispatch(UpdateCustomer({ customerId, updatedFields })).then((response) => {
              if (UpdateCustomer.fulfilled.match(response)) {
                const customerData = response.payload;
                if (customerData) {
                  alert('Profile Successfully updated!');
                }
                handleEditToggle();
                handleShowTogle();
                setLoading(false);
              }
            });
          }
        }
      });
    }
  };
  return (
    <form
      className='profile-form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={'address-container span-2'}>
        <label
          className='country-label'
          htmlFor={'shippingAddress.country'}
        >
          Country:
        </label>
        <Controller
          control={control}
          name={'shippingAddress.country'}
          render={({ field, fieldState }) => (
            <>
              <select
                {...field}
                name={'shippingAddress.country'}
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

        <label htmlFor={'shippingAddress.streetName'}>Street: </label>
        <Controller
          control={control}
          name={'shippingAddress.streetName'}
          render={({ field, fieldState }) => (
            <Input
              name={'shippingAddress.streetName'}
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

        <label htmlFor={'shippingAddress.city'}>City: </label>
        <Controller
          control={control}
          name={'shippingAddress.city'}
          render={({ field, fieldState }) => (
            <Input
              name={'shippingAddress.city'}
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

        <label htmlFor={'shippingAddress.postalCode'}>Postal Code: </label>
        <Controller
          control={control}
          name={'shippingAddress.postalCode'}
          render={({ field, fieldState }) => (
            <Input
              name={'shippingAddress.postalCode'}
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

      <div className='editting-btns-container'>
        <OutlinedButton
          wideBtn={false}
          type='submit'
          text='Save'
        />
        <button
          className='outlinedButton editting-cancel'
          onClick={handleShowTogle}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddShippingAddress;
