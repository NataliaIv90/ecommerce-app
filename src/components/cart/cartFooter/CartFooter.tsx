import React from 'react';
import './CartFooter.css';
import { ICartItemData, arrMockedData } from '../cartList/CartList';
import { formatPrice } from '../../../utils/price-formatting-functions';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';

interface ICartFooterProps {
  data?: ICartItemData[];
}

export const CartFooter = ({ data }: ICartFooterProps): JSX.Element => {
  return (
    <div className='cart-footer'>
      <h2 className='cart-footer__title'>Total:</h2>
      <div className='cart-footer__content-container'>
        <ul className='cart-footer__list'>
          {arrMockedData.length ? (
            arrMockedData.map((el, index) => (
              <li
                className='cart-footer__list-item'
                key={el.id}
              >
                <p>
                  {index + 1}. {el.title}
                </p>
                <p>${formatPrice(el.amount * el.price)}</p>
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
            <p>Sale:</p>
            <p>0.00</p>
          </div>
          <div className='cart-footer__details-item'>
            <p>Total:</p>
            <p>0.00</p>
          </div>
        </div>
        <OutlinedButton
          text='CONFIRM ORDER'
          wideBtn={true}
        />
      </div>
    </div>
  );
};
