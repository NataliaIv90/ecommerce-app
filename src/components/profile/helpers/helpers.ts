import { Address, Customer } from '@commercetools/platform-sdk';

export const getShippingAddresses = (customer: Customer | null): Address[] | [] => {
  if (!customer) return [];
  return customer.addresses.filter((address: Address) => {
    let temp;
    customer.shippingAddressIds?.forEach((id) => {
      if (id === address.id) {
        temp = address;
        return;
      }
    });

    return temp;
  });
};

export const getBillinggAddresses = (customer: Customer | null): Address[] | [] => {
  if (!customer) return [];
  return customer.addresses.filter((address: Address) => {
    let temp;
    customer.shippingAddressIds?.forEach((id) => {
      if (id === address.id) {
        temp = address;
        return;
      }
    });

    return temp;
  });
};

export const isDefault = (address: Address, defaultAddressId: string | undefined): boolean =>
  address.id === defaultAddressId;
