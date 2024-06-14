import React, { FC, useState } from 'react';
import './CartListItem.css';
import { formatPrice } from '../../../utils/price-formatting-functions';
import { LineItem } from '@commercetools/platform-sdk';
import { QuantityController } from '../../../shared/button/quantityController/QuantityController';

interface CartListItemProps {
  lineItem: LineItem;
}

export const CartListItem: FC<CartListItemProps> = ({ lineItem }): JSX.Element => {
  const { id, name, variant, price, quantity } = lineItem;
  const [amount, setAmount] = useState(quantity || 0);
  return (
    <div
      className='cart-list-item'
      key={id}
    >
      <div className='cart-list-item__img-container'>
        {variant.images && variant.images.length > 0 && (
          <img
            className='cart-list-item__img'
            src={variant.images[0].url}
            alt={name['en-US']}
          />
        )}
      </div>
      <div className='cart-list-item__details'>
        <div>
          <h2 className='cart-item-title'>{name['en-US']}</h2>
        </div>
        <div className='cart-item-price-container'>
          <p>{formatPrice(price.value.centAmount)}$ / per item</p>
          <QuantityController
            amount={amount}
            setAmount={setAmount}
          />
        </div>
      </div>
    </div>
  );
};
