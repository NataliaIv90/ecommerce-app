import React from 'react';
import './Cart.css';
import { CartList } from './cartList/CartList';
import { CartFooter } from './cartFooter/CartFooter';
import { EmptyCartMessage } from './emptyCartMessage/EmptyCartMessage';
import { CartSkeleton } from './cartSkeleton/CartSceleton';
import { useFetchCartData } from '../../hooks/useFetchCartData';

export const Cart = (): JSX.Element => {
  const { isLoading, cartData, error } = useFetchCartData();

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (error) {
    return <EmptyCartMessage message={JSON.stringify(error)} />;
  }

  if (!cartData || !cartData.lineItems || cartData.lineItems.length === 0) {
    return <EmptyCartMessage message='' />;
  }

  return (
    <div className='cart'>
      <CartList lineItems={cartData.lineItems} />
      <CartFooter data={cartData} />
    </div>
  );
};
