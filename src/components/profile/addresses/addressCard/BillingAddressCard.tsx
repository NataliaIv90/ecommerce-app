import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { Address, Customer } from '@commercetools/platform-sdk';
import { ECountrieOptions } from '../../../../types/types';
import Input from '../../../../shared/ui/Input/Input';
import addressesValidationSchema from './billingAddressValidationSchema';
import { OutlinedButton } from '../../../../shared/button/outlinedButton/OutlinedButton';
import { isDefault } from '../../helpers/helpers';
import { setLoading } from '../../../../store/slices/productSlice';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { UpdateCustomer } from '../../../../store/slices/customerSlice';

interface IEditAddress {
  billingAddress: IEditBillingAddress;
}

interface IEditBillingAddress {
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

const BillingAddressCard = ({
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
      data.billingAddress.city !== address?.city ||
      data.billingAddress.country !== address?.country ||
      data.billingAddress.postalCode !== address?.postalCode ||
      data.billingAddress.streetName !== address?.streetName
    ) {
      const customerId = customer?.id || '';
      const updatedAddress: Address = {
        firstName: customer?.firstName,
        lastName: customer.lastName,
        city: data.billingAddress.city?.trim(),
        country: countriesCodes[data.billingAddress.country || address.country],
        postalCode: data.billingAddress.postalCode?.trim(),
        streetName: data.billingAddress.streetName?.trim(),
      };

      const updatedFields = {
        changeBillingAddress: { addressId: address.id, address: updatedAddress },
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
      setDefaultBillingAddress: { addressId: address.id },
    };
    void dispatch(UpdateCustomer({ customerId, updatedFields })).then((response) => {
      if (UpdateCustomer.fulfilled.match(response)) {
        const customerData = response.payload;
        if (customerData) {
          alert('Address Successfully Set As Default!');
        }
        handleEditToggle();
        setLoading(false);
      }
    });
  };

  const { control, handleSubmit } = useForm<IEditAddress>({
    defaultValues: {
      billingAddress: {
        streetName: address.streetName,
        country: Object.keys(countriesCodes).find((key) => countriesCodes[key] === address.country) as ECountrieOptions,
        city: address.city,
        postalCode: address.postalCode,
      },
    },
    resolver: yupResolver(addressesValidationSchema) as Resolver<IEditAddress>,
    mode: 'all',
  });

  const isDefaultBillingAddress = isDefault(address, customer?.defaultBillingAddressId);

  return (
    <form
      className='profile-form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={'address-container span-2' + (isDefaultBillingAddress ? ' default' : '')}>
        {isDefaultBillingAddress ? <h3 className='span-2'>Default Billing Address</h3> : null}

        <label
          className='country-label'
          htmlFor={'billingAddress.country'}
        >
          Country:
        </label>
        <Controller
          control={control}
          name={'billingAddress.country'}
          render={({ field, fieldState }) => (
            <>
              <select
                {...field}
                name={'billingAddress.country'}
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

        <label htmlFor={'billingAddress.streetName'}>Street: </label>
        <Controller
          control={control}
          name={'billingAddress.streetName'}
          render={({ field, fieldState }) => (
            <Input
              name={'billingAddress.streetName'}
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

        <label htmlFor={'billingAddress.city'}>City: </label>
        <Controller
          control={control}
          name={'billingAddress.city'}
          render={({ field, fieldState }) => (
            <Input
              name={'billingAddress.city'}
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

        <label htmlFor={'billingAddress.postalCode'}>Postal Code: </label>
        <Controller
          control={control}
          name={'billingAddress.postalCode'}
          render={({ field, fieldState }) => (
            <Input
              name={'billingAddress.postalCode'}
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

        {!isDefaultBillingAddress && (
          <button
            onClick={handleSetAsDefault}
            className='set-as-default'
          >
            Set As Default Billing Address
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

export default BillingAddressCard;
