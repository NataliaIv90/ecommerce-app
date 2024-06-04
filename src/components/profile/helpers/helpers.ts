import { Address, Customer } from '@commercetools/platform-sdk';

export const getShippingAddresses = (customer: Customer | null): Address[] | [] => {
  if (!customer || !Object.keys(customer).length) return [];

  return customer?.addresses?.filter((address: Address) => {
    // eslint-disable-next-line array-callback-return
    if (!address.id) return;

    return customer?.shippingAddressIds?.includes(address.id);
  });
};

export const getBillinggAddresses = (customer: Customer | null): Address[] | [] => {
  if (!customer || !Object.keys(customer).length) return [];

  return customer?.addresses?.filter((address: Address) => {
    // eslint-disable-next-line array-callback-return
    if (!address.id) return;

    return customer?.billingAddressIds?.includes(address.id);
  });
};

export const isDefault = (address: Address, defaultAddressId: string | undefined): boolean =>
  address?.id === defaultAddressId;
