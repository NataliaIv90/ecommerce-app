import React, { FC, useEffect, useState, useCallback } from 'react';
import './CartListItem.css';
import { formatPrice } from '../../../utils/price-formatting-functions';
import { LineItem } from '@commercetools/platform-sdk';
import { QuantityController } from '../../../shared/button/quantityController/QuantityController';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { changeProductQuantityInCart } from '../../../store/slices/cartSlice';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartListItemProps {
  lineItem: LineItem;
}

export const CartListItem: FC<CartListItemProps> = ({ lineItem }): JSX.Element => {
  const { id, name, variant, price, quantity, totalPrice } = lineItem;
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(quantity || 0);
  const [isLoading, setIsLoading] = useState(false);

  const updateItemAmount = useCallback(async () => {
    setIsLoading(true);
    if (quantity !== amount) {
      await dispatch(changeProductQuantityInCart({ productId: id, quantity: amount }));
    }
    setIsLoading(false);
  }, [amount, dispatch, id, quantity]);

  useEffect(() => {
    updateItemAmount();
  }, [updateItemAmount, setIsLoading]);

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
          <p>${formatPrice(price.value.centAmount)} / per item</p>
          <QuantityController
            amount={quantity}
            setAmount={setAmount}
            disabled={isLoading}
          />
        </div>
        <div>
          <p className='cart-item-price-container'>Total: ${formatPrice(totalPrice.centAmount)}</p>
        </div>
        <div className='cart__remove-btn'>
          <Button
            className='cart-delete-item-btn'
            color='error'
            title='Remove item from the cart'
            disabled={isLoading}
            onClick={() => setAmount(0)}
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
