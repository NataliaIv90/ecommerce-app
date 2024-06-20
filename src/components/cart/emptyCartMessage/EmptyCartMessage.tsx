import React, { FC } from 'react';
import '../Cart.css';
import { useNavigate } from 'react-router-dom';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';

type IEmptyCartMessageProps = {
  message?: string;
};

export const EmptyCartMessage: FC<IEmptyCartMessageProps> = ({ message }): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className='cart__is-empty'>
      <div className='empty-cart-content'>
        {message ? (
          <>
            <h2>An error occured during loading your cart:</h2>
            <p className='cart__error'>{typeof message === 'string' ? message : JSON.stringify(message)}</p>
            <p>Check your internet connection and try to reload the page.</p>
          </>
        ) : (
          <>
            <h2>Your cart is currently empty</h2>
            <p>It looks like you haven't added any flowers to your basket yet.</p>
            <p>Browse our beautiful collection of blooms and find the perfect bouquet for any occasion!</p>
          </>
        )}
        <div className='empty-cart-btn-container'>
          <OutlinedButton
            onClick={() => navigate('/catalog')}
            text='To catalog'
          />
        </div>
      </div>
    </div>
  );
};
