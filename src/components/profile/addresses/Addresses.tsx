import { Address, Customer } from '@commercetools/platform-sdk';
import ShippingAddressCard from './addressCard/ShippingAddressCard';
import BillingAddressCard from './addressCard/BillingAddressCard';
import { useState } from 'react';
import AddBillingAddress from './addNewAddress/AddBillingAddress';
import AddShippingAddress from './addNewAddress/AddShippingAddress';

const Addresses = ({
  customer,
  shippingAddresses,
  billingAddresses,
  handleEditToggle,
}: {
  customer: Customer;
  shippingAddresses: Address[];
  billingAddresses: Address[];
  handleEditToggle: () => void;
}): JSX.Element => {
  const [showAddShippingAddress, setShowAddShippingAddress] = useState(false);
  const [showAddBillingAddress, setShowAddBillingAddress] = useState(false);

  const handleShowShippingTogle = (): void => {
    setShowAddShippingAddress((prev) => !prev);
  };

  const handleShowBillingTogle = (): void => {
    setShowAddBillingAddress((prev) => !prev);
  };
  return (
    <div>
      <h2>Shipping addresses</h2>
      <div className='profile-form__spacer'></div>

      {shippingAddresses?.map((address, index) => {
        return (
          <ShippingAddressCard
            customer={customer}
            address={address}
            key={index}
            handleEditToggle={handleEditToggle}
          />
        );
      })}

      {showAddShippingAddress && (
        <AddShippingAddress
          customer={customer}
          handleShowTogle={handleShowShippingTogle}
          handleEditToggle={handleEditToggle}
        />
      )}

      <button
        onClick={handleShowShippingTogle}
        className='add-new-address'
      >
        Add Shipping Address
      </button>
      <div className='profile-form__spacer'></div>
      <hr />
      <hr />
      <div className='profile-form__spacer'></div>

      <h2>Billing addresses</h2>
      <div className='profile-form__spacer'></div>

      {billingAddresses?.map((address, index) => {
        return (
          <BillingAddressCard
            customer={customer}
            address={address}
            key={index}
            handleEditToggle={handleEditToggle}
          />
        );
      })}

      {showAddBillingAddress && (
        <AddBillingAddress
          customer={customer}
          handleShowTogle={handleShowBillingTogle}
          handleEditToggle={handleEditToggle}
        />
      )}

      <button
        onClick={handleShowBillingTogle}
        className='add-new-address'
      >
        Add Billing Address
      </button>
    </div>
  );
};

export default Addresses;
