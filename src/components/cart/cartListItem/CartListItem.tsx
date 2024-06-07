import React, { FC, useState } from 'react';
import './CartListItem.css';
import { formatPrice } from '../../../utils/price-formatting-functions';
import { QuantityController } from '../../../shared/button/quantityController/QuantityController';
import { ICartItemData } from '../cartList/CartList';
import { mockedData } from '../cartList/CartList';

export const CartListItem: FC<ICartItemData> = ({ img, title, id, amount = 0, price = 0 }): JSX.Element => {
  const [itemAmount, setAmount] = useState(mockedData.amount || 0);
  return (
    <div
      className='cart-list-item'
      key={mockedData.id}
    >
      <div className='cart-list-item__img-container'>
        <img
          className='cart-list-item__img'
          src={mockedData.img}
          alt={mockedData.title}
        />
      </div>
      <div className='cart-list-item__details'>
        <div>
          <h2 className='cart-item-title'>{mockedData.title}</h2>
        </div>
        <div className='cart-item-price-container'>
          <p>{formatPrice(mockedData.price)}$ / per item</p>
          <QuantityController
            amount={itemAmount}
            setAmount={setAmount}
          />
        </div>
      </div>
    </div>
  );
};
