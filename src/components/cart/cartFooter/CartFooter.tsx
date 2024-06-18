import React from 'react';
import './CartFooter.css';
import { formatPrice } from '../../../utils/price-formatting-functions';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';
import { Cart } from '@commercetools/platform-sdk';
import { Button, TextField } from '@mui/material';
import { calculateTotalPriceBeforeDiscounts, preparePriceDataForCartFooter } from '../../../utils/cartUtils';

interface ICartFooterProps {
  data?: Cart;
  clearCart: () => void;
  promocode: string;
  setPromocode: (promocode: string) => void;
  handlePromoCode: () => void;
}

export const CartFooter = ({
  data,
  clearCart,
  promocode,
  setPromocode,
  handlePromoCode,
}: ICartFooterProps): JSX.Element => {
  const promoIsApplied = data?.discountCodes && data.discountCodes.length > 0;
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
                {/* <div> */}
                {preparePriceDataForCartFooter(el.totalPrice.centAmount, el.price.value.centAmount * el.quantity)}
                {/* <p>${formatPrice(el.price.value.centAmount * el.quantity)}</p>
                  <p>
                    $
                    {formatPrice(el.price.value.centAmount * el.quantity) !== formatPrice(el.totalPrice.centAmount)
                      ? formatPrice(el.totalPrice.centAmount)
                      : null}
                  </p> */}
                {/* </div> */}
              </li>
            ))
          ) : (
            <p>No data to display</p>
          )}
        </ul>
        <div className='cart-footer__details'>
          {promoIsApplied ? (
            <div className='cart-footer__details-item'>
              <p>Total value without discounts:</p>
              <p>${formatPrice(calculateTotalPriceBeforeDiscounts(data))}</p>
            </div>
          ) : null}

          <div className='cart-footer__details-item'>
            <p>Discount on total price:</p>
            <p>${formatPrice(data?.discountOnTotalPrice?.discountedAmount.centAmount || 0)}</p>
          </div>

          <div className='cart-footer__details-item'>
            <p>Delivery:</p>
            <p>Free</p>
          </div>
          <div className='cart-footer__details-item'>
            <p>Items in cart:</p>
            <p>{data?.totalLineItemQuantity}</p>
          </div>
          <div className='cart-footer__details-item'>
            <p>Final price:</p>
            <p>${formatPrice(data?.totalPrice?.centAmount ? data?.totalPrice?.centAmount : 0)}</p>
          </div>
        </div>
        <div className='cart__promo-inp-container'>
          <TextField
            id='promocode-input'
            placeholder='Enter your promocode'
            variant='standard'
            color='success'
            value={promocode}
            onChange={(e) => setPromocode(e.target.value)}
            disabled={promoIsApplied}
          />
          <Button
            color='success'
            variant='outlined'
            onClick={handlePromoCode}
            disabled={promoIsApplied}
          >
            Apply
          </Button>
        </div>
        {promoIsApplied ? <p className='red-text'>*Promo code is applied</p> : null}
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
