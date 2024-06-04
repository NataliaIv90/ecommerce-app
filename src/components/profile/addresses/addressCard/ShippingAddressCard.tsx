import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { Address, Customer } from '@commercetools/platform-sdk';
import { ECountrieOptions } from '../../../../types/types';
import Input from '../../../../shared/ui/Input/Input';
import addressesValidationSchema from './shippingAddressValidationSchema';
import { OutlinedButton } from '../../../../shared/button/outlinedButton/OutlinedButton';
import { isDefault } from '../../helpers/helpers';
import { setLoading } from '../../../../store/slices/productSlice';
import { UpdateCustomer } from '../../../../store/slices/customerSlice';
import { useAppDispatch } from '../../../../hooks/reduxHooks';

interface IEditAddress {
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

const AddressCard = ({
  customer,
  address,
  handleEditToggle,
}: {
  customer: Customer;
  address: Address;
  handleEditToggle: () => void;
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const onSubmit = (data: IEditAddress) => {
    if (
      data.shippingAddress.city !== address?.city ||
      data.shippingAddress.country !== address?.country ||
      data.shippingAddress.postalCode !== address?.postalCode ||
      data.shippingAddress.streetName !== address?.streetName
    ) {
      const customerId = customer?.id || '';
      const updatedAddress: Address = {
        firstName: customer?.firstName,
        lastName: customer.lastName,
        city: data.shippingAddress.city,
        country: countriesCodes[data.shippingAddress.country || address.country],
        postalCode: data.shippingAddress.postalCode,
        streetName: data.shippingAddress.streetName,
      };

      const updatedFields = {
        changeShippingAddress: { addressId: address.id, address: updatedAddress },
      };

      setLoading(true);
      void dispatch(UpdateCustomer({ customerId, updatedFields })).then((response) => {
        if (UpdateCustomer.fulfilled.match(response)) {
          const customerData = response.payload;
          if (customerData) {
            alert('Profile Successfully updated!');
          }
          handleEditToggle();
          setLoading(false);
        }
      });
    }
  };

  const isDefaultShippingAddress = isDefault(address, customer?.defaultShippingAddressId);

  const { control, handleSubmit } = useForm<IEditAddress>({
    defaultValues: {
      shippingAddress: {
        streetName: address.streetName,
        country: Object.keys(countriesCodes).find((key) => countriesCodes[key] === address.country) as ECountrieOptions,
        city: address.city,
        postalCode: address.postalCode,
      },
    },
    resolver: yupResolver(addressesValidationSchema) as Resolver<IEditAddress>,
    mode: 'all',
  });

  const handleDelete = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const customerId = customer?.id || '';
    const updatedFields = {
      removeAddress: { addressId: address.id },
    };
    void dispatch(UpdateCustomer({ customerId, updatedFields })).then((response) => {
      if (UpdateCustomer.fulfilled.match(response)) {
        const customerData = response.payload;
        if (customerData) {
          alert('Address Successfully Deleted!');
        }
        handleEditToggle();
        setLoading(false);
      }
    });
  };

  const handleSetAsDefault = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const customerId = customer?.id || '';
    const updatedFields = {
      setDefaultShippingAddress: { addressId: address.id },
    };
    void dispatch(UpdateCustomer({ customerId, updatedFields })).then((response) => {
      if (UpdateCustomer.fulfilled.match(response)) {
        const customerData = response.payload;
        if (customerData) {
          alert('Address Successfully Set As Default!!');
        }
        handleEditToggle();
        setLoading(false);
      }
    });
  };

  return (
    <form
      className='profile-form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        key={address.id}
        className={'address-container span-2' + (isDefaultShippingAddress ? ' default' : '')}
      >
        {isDefaultShippingAddress ? <h3 className='span-2'>Default Shipping Address</h3> : null}

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
          defaultValue={address.postalCode}
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

        <button
          onClick={handleDelete}
          className='delete-address'
        >
          X
        </button>

        {!isDefaultShippingAddress && (
          <button
            onClick={handleSetAsDefault}
            className='set-as-default'
          >
            Set As Default Shipping Address
          </button>
        )}
      </div>

      <div className='editting-btns-container'>
        <OutlinedButton
          wideBtn={false}
          type='submit'
          text='Save'
        />
        <button
          className='outlinedButton editting-cancel'
          onClick={handleEditToggle}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressCard;
