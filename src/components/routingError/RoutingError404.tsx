import React from 'react';
import './RoutingError404.css';
import { OutlinedButton } from '../../shared/button/outlinedButton/OutlinedButton';
import { useNavigate } from 'react-router-dom';

export const RoutingError404 = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className='routingError'>
      <div className='routingError_contentContainer'>
        <h1 className='routingError__title'>Oops!</h1>
        <p className='routingError__subtitle'>Lost in the Garden</p>
        <p>The page you're looking for can't be found.</p>
        <p>Head back to our homepage and continue your floral journey with us!</p>
        <span className='routingError__btnContainer'>
          <OutlinedButton
            text='Back to Home'
            onClick={() => navigate('/')}
          />
        </span>
      </div>
    </div>
  );
};
