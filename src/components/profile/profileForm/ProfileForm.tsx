import { useAppSelector } from '../../../hooks/reduxHooks';
import { useState } from 'react';
import { getBillinggAddresses, getShippingAddresses, isDefault } from '../helpers/helpers';
import { Address } from '@commercetools/platform-sdk';
import PersoanlDetails from '../personalDetails/PersonalDetails';
import Addresses from '../addresses/Addresses';
import './ProfileForm.css';
import ResetPassword from '../resetPassword/ResetPassword';

interface IProfileFormProps {
  selectedItem: string;
}

export const ProfileForm = ({ selectedItem }: IProfileFormProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const customer = useAppSelector((state) => state.customers.customer);

  const shippingAddresses: Address[] | [] = getShippingAddresses(customer);
  const billingAddresses: Address[] | [] = getBillinggAddresses(customer);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div>
      {isEditing ? (
        <>
          {selectedItem === 'personal_info' && customer && (
            <PersoanlDetails
              customer={customer}
              handleEditToggle={handleEditToggle}
            />
          )}
          {selectedItem === 'addresses' && customer && (
            <Addresses
              customer={customer}
              shippingAddresses={shippingAddresses}
              billingAddresses={billingAddresses}
              handleEditToggle={handleEditToggle}
            />
          )}
          {selectedItem === 'change_password' && <ResetPassword handleEditToggle={handleEditToggle} />}
        </>
      ) : (
        <div id='profile-view'>
          {selectedItem === 'personal_info' && (
            <div className='profile-details'>
              <span>First Name:</span> <span>{customer?.firstName}</span>
              <span>Last Name:</span> <span>{customer?.lastName}</span>
              <span>Email:</span> <span>{customer?.email}</span>
              <span>Date of birth:</span> <span>{customer?.dateOfBirth}</span>
            </div>
          )}

          {selectedItem === 'addresses' && (
            <div className='addresses-container'>
              <h3>Shipping addresses</h3>
              {shippingAddresses?.map((address) => {
                const isDefaultShppingAddress = isDefault(address, customer?.defaultShippingAddressId);
                return (
                  <div
                    key={address.id}
                    className={'address-container no-edit' + (isDefaultShppingAddress ? ' default' : '')}
                  >
                    {isDefaultShppingAddress && <h4>Default Shipping Address</h4>}
                    <div className='address__label-value-wrapper'>
                      <span className='address-info__label'>Country</span>
                      <span>{address?.country}</span>
                    </div>
                    <div className='address__label-value-wrapper'>
                      <span className='address-info__label'>Street</span>
                      <span>{address.streetName}</span>
                    </div>
                    <div className='address__label-value-wrapper'>
                      <span className='address-info__label'>City</span>
                      <span>{address.city}</span>
                    </div>
                    <div className='address__label-value-wrapper'>
                      <span className='address-info__label'>Postal code</span>
                      <span>{address.postalCode}</span>
                    </div>
                  </div>
                );
              })}

              <div className='profile-form__spacer'></div>
              <hr />
              <hr />
              <div className='profile-form__spacer'></div>

              <h3>Billing addresses</h3>
              {billingAddresses?.map((address) => {
                const isDefaultBillingAddress = isDefault(address, customer?.defaultBillingAddressId);
                return (
                  <div
                    key={address.id}
                    className={'address-container no-edit' + (isDefaultBillingAddress ? ' default' : '')}
                  >
                    {isDefaultBillingAddress && <h4>Default Billing Address</h4>}
                    <div className='address__label-value-wrapper'>
                      <span className='address-info__label'>Country</span>
                      <span>{address?.country}</span>
                    </div>
                    <div className='address__label-value-wrapper'>
                      <span className='address-info__label'>Street</span>
                      <span>{address.streetName}</span>
                    </div>
                    <div className='address__label-value-wrapper'>
                      <span className='address-info__label'>City</span>
                      <span>{address.city}</span>
                    </div>
                    <div className='address__label-value-wrapper'>
                      <span className='address-info__label'>Postal code</span>
                      <span>{address.postalCode}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedItem === 'change_password' && (
            <div className='address__label-value-wrapper'>
              <span className='address-info__label'>Password</span>
              <span>********</span>
            </div>
          )}
        </div>
      )}

      {!isEditing && (
        <button
          className='outlinedButton editting-btn'
          onClick={handleEditToggle}
        >
          Edit
        </button>
      )}
    </div>
  );
};
