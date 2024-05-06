import React from 'react';
import './RoutingError.css';
import { OutlinedButton } from '../../shared/button/outlinedButton/OutlinedButton';
import { useNavigate } from 'react-router-dom';

export const RoutingError = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className='RoutingError'>
      <div className='RoutingError_contentContainer'>
        <h1 className='RoutingError__title'>Oops!</h1>
        <p className='RoutingError__subtitle'>Lost in the Garden</p>
        <p>The page you're looking for can't be found.</p>
        <p>Head back to our homepage and continue your floral journey with us!</p>
        <span className='RoutingError__btnContainer'>
          <OutlinedButton
            text='Back to Home'
            onClick={() => navigate('/')}
          />
        </span>
      </div>
    </div>
  );
};
