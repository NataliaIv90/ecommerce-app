import React from 'react';
import './CartFooter.css';
import { formatPrice } from '../../../utils/price-formatting-functions';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';
import { Cart } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';

interface ICartFooterProps {
  data?: Cart;
  clearCart: () => void;
}

export const CartFooter = ({ data, clearCart }: ICartFooterProps): JSX.Element => {
  return (
    <div className='cart-footer'>
      <h2 className='cart-footer__title'>Total:</h2>
      <div className='cart-footer__content-container'>
        <ul className='cart-footer__list'>
          {data?.lineItems && data?.lineItems.length ? (
            data.lineItems.map((el, index) => (
              <li
                className='cart-footer__list-item'
                key={el.id}
              >
                <p>
                  {index + 1}. {el.name['en-US']}
                </p>
                <p>${formatPrice(el.totalPrice.centAmount)}</p>
              </li>
            ))
          ) : (
            <p>No data to display</p>
          )}
        </ul>
        <div className='cart-footer__details'>
          <div className='cart-footer__details-item'>
            <p>Delivery:</p>
            <p>Free</p>
          </div>
          <div className='cart-footer__details-item'>
            <p>Items in cart:</p>
            <p>{data?.totalLineItemQuantity}</p>
          </div>
          <div className='cart-footer__details-item'>
            <p>Total price:</p>
            <p>${formatPrice(data?.totalPrice?.centAmount ? data?.totalPrice?.centAmount : 0)}</p>
          </div>
        </div>
        <OutlinedButton
          text='CONFIRM ORDER'
          wideBtn={true}
        />
        <Button
          color='error'
          className='clear-cart-btn'
          variant='outlined'
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};
