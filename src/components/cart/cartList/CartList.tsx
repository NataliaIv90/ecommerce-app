import React, { FC } from 'react';
import './CartList.css';
import { CartListItem } from '../cartListItem/CartListItem';
import { LineItem } from '@commercetools/platform-sdk';

interface CartListProps {
  lineItems: LineItem[];
}

export const CartList: FC<CartListProps> = ({ lineItems }): JSX.Element => {
  return (
    <div className='cart-list'>
      <h1 className='cart-list__title'>Flowers in your basket:</h1>
      {lineItems.map((item) => (
        <CartListItem
          key={item.id}
          lineItem={item}
        />
      ))}
    </div>
  );
};
