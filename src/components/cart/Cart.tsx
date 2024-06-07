import React from 'react';
import './Cart.css';
import { CartList } from './cartList/CartList';
import { CartFooter } from './cartFooter/CartFooter';

export const Cart = (): JSX.Element => {
  return (
    <div className='cart'>
      <CartList />
      <CartFooter />
    </div>
  );
};
