import React from 'react';
import './CartList.css';
import { CartListItem } from '../cartListItem/CartListItem';
// import { ProductProjection } from '@commercetools/platform-sdk';

interface ICartListData {
  // data?: ProductProjection[] | [];
  data?: object[];
}

export interface ICartItemData {
  img?: string;
  title?: string;
  id?: string;
  amount?: number;
  price?: number | undefined;
}

export const mockedData = {
  img: 'https://images.us-east-2.aws.commercetools.com/9f45ce5c-ad8e-4f4b-9a73-776602b9b715/a345b8970f4fae9d551d-kCXlGEqQ.jpg',
  title: 'Wheat and lavender summer bouquet',
  id: '23ae6954-34c4-4725-b724-e69972ca9178',
  amount: 6,
  price: 5300,
};

export const arrMockedData = [mockedData, mockedData];

export const CartList = ({ data = [] }: ICartListData): JSX.Element => {
  return (
    <div className='cart-list'>
      <h1 className='cart-list__title'>Flowers in your basket:</h1>
      <CartListItem />
      <CartListItem />
    </div>
  );
};
